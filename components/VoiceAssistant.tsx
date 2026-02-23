
import React, { useState, useRef, useCallback } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality } from '@google/genai';
import { Mic, MicOff, X, Sparkles, Headphones } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Audio Encoding/Decoding Helpers
function encode(bytes: Uint8Array) {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

interface VoiceAssistantProps {
  contextData?: any;
}

export const VoiceAssistant: React.FC<VoiceAssistantProps> = ({ contextData }) => {
  const [isActive, setIsActive] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [userTranscription, setUserTranscription] = useState('');
  const [aiTranscription, setAiTranscription] = useState('');
  
  const sessionRef = useRef<any>(null);
  const inputAudioCtxRef = useRef<AudioContext | null>(null);
  const outputAudioCtxRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const micStreamRef = useRef<MediaStream | null>(null);
  
  // Refs to accumulate transcription text to avoid stale closures in onmessage
  const currentInputTranscriptionRef = useRef('');
  const currentOutputTranscriptionRef = useRef('');

  const cleanup = useCallback(() => {
    if (sessionRef.current) {
      sessionRef.current.close();
      sessionRef.current = null;
    }
    if (micStreamRef.current) {
      micStreamRef.current.getTracks().forEach(track => track.stop());
      micStreamRef.current = null;
    }
    if (inputAudioCtxRef.current) {
      inputAudioCtxRef.current.close();
      inputAudioCtxRef.current = null;
    }
    if (outputAudioCtxRef.current) {
      outputAudioCtxRef.current.close();
      outputAudioCtxRef.current = null;
    }
    sourcesRef.current.forEach(source => source.stop());
    sourcesRef.current.clear();
    nextStartTimeRef.current = 0;
    currentInputTranscriptionRef.current = '';
    currentOutputTranscriptionRef.current = '';
    setIsActive(false);
    setIsConnecting(false);
  }, []);

  const startAssistant = async () => {
    try {
      setIsConnecting(true);
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      inputAudioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      outputAudioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      micStreamRef.current = stream;

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        callbacks: {
          onopen: () => {
            setIsConnecting(false);
            setIsActive(true);
            const source = inputAudioCtxRef.current!.createMediaStreamSource(stream);
            const scriptProcessor = inputAudioCtxRef.current!.createScriptProcessor(4096, 1, 1);
            scriptProcessor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const l = inputData.length;
              const int16 = new Int16Array(l);
              for (let i = 0; i < l; i++) int16[i] = inputData[i] * 32768;
              const pcmBlob = { data: encode(new Uint8Array(int16.buffer)), mimeType: 'audio/pcm;rate=16000' };
              // Ensure data is sent only after the session promise resolves
              sessionPromise.then(session => session.sendRealtimeInput({ media: pcmBlob }));
            };
            source.connect(scriptProcessor);
            scriptProcessor.connect(inputAudioCtxRef.current!.destination);
          },
          onmessage: async (message: LiveServerMessage) => {
            const audioData = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (audioData && outputAudioCtxRef.current) {
              const ctx = outputAudioCtxRef.current;
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, ctx.currentTime);
              const buffer = await decodeAudioData(decode(audioData), ctx, 24000, 1);
              const source = ctx.createBufferSource();
              source.buffer = buffer;
              source.connect(ctx.destination);
              source.addEventListener('ended', () => sourcesRef.current.delete(source));
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += buffer.duration;
              sourcesRef.current.add(source);
            }
            if (message.serverContent?.interrupted) {
              sourcesRef.current.forEach(s => s.stop());
              sourcesRef.current.clear();
              nextStartTimeRef.current = 0;
            }
            // Fix: Correct property names and use refs for accumulation
            if (message.serverContent?.inputTranscription) {
              const text = message.serverContent.inputTranscription.text;
              currentInputTranscriptionRef.current += text;
              setUserTranscription(currentInputTranscriptionRef.current);
            }
            if (message.serverContent?.outputTranscription) {
              const text = message.serverContent.outputTranscription.text;
              currentOutputTranscriptionRef.current += text;
              setAiTranscription(currentOutputTranscriptionRef.current);
            }
            if (message.serverContent?.turnComplete) {
              // Reset accumulation for next turn
              currentInputTranscriptionRef.current = '';
              currentOutputTranscriptionRef.current = '';
              setUserTranscription('');
              setAiTranscription('');
            }
          },
          onerror: () => cleanup(),
          onclose: () => cleanup()
        },
        config: {
          responseModalities: [Modality.AUDIO],
          inputAudioTranscription: {},
          outputAudioTranscription: {},
          speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } } },
          systemInstruction: `You are the SMW Construction Assistant. Concisely help users find property in Uganda.`
        }
      });
      sessionRef.current = await sessionPromise;
    } catch (err) {
      setIsConnecting(false);
    }
  };

  return (
    <>
      <div className="fixed bottom-8 right-8 z-[50]">
        <button
          onClick={isActive ? cleanup : startAssistant}
          disabled={isConnecting}
          className={`relative group w-14 h-14 rounded-full flex items-center justify-center transition-all duration-500 shadow-2xl ${
            isActive ? 'bg-red-500 scale-110' : 'bg-[#8DC63F] hover:scale-110'
          } ${isConnecting ? 'animate-pulse' : ''}`}
        >
          <AnimatePresence mode="wait">
            {isActive ? (
              <motion.div key="active" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}><MicOff className="text-white" size={20} /></motion.div>
            ) : (
              <motion.div key="inactive" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}><Mic className="text-white" size={20} /></motion.div>
            )}
          </AnimatePresence>
          {isActive && <div className="absolute inset-0 rounded-full border-2 border-red-500/50 animate-ping" />}
        </button>
      </div>

      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[#06080f]/95 backdrop-blur-2xl flex flex-col items-center justify-center p-8"
          >
            <button onClick={cleanup} className="absolute top-10 right-10 text-gray-500 hover:text-white transition-colors"><X size={32} /></button>
            <div className="w-full max-w-4xl flex flex-col items-center space-y-12">
              <div className="relative w-32 h-32 flex items-center justify-center">
                <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute inset-0 bg-[#8DC63F]/20 rounded-full blur-3xl" />
                <div className="relative z-10 w-20 h-20 bg-[#8DC63F] rounded-full flex items-center justify-center shadow-2xl"><Headphones className="text-white" size={32} /></div>
              </div>
              <div className="text-center">
                <h2 className="text-2xl font-black text-white uppercase tracking-tighter">SMW Voice Link</h2>
                <div className="flex items-center justify-center gap-2 text-[#8DC63F] font-bold text-xs uppercase tracking-widest mt-2"><Sparkles size={12} /> Live Node Active</div>
              </div>
              <div className="w-full grid md:grid-cols-2 gap-6 h-48">
                <div className="bg-white/5 border border-white/10 rounded-3xl p-6 overflow-y-auto custom-scrollbar">
                  <p className="text-[9px] font-black uppercase text-[#8DC63F] tracking-widest mb-3">Transmission</p>
                  <p className="text-gray-300 font-medium italic">{userTranscription || "..."}</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-3xl p-6 overflow-y-auto custom-scrollbar">
                  <p className="text-[9px] font-black uppercase text-blue-400 tracking-widest mb-3">Response</p>
                  <p className="text-white font-bold">{aiTranscription || "..."}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
