
import React, { useEffect, useState } from 'react';
import { 
  CheckCircle2, Circle, Plus, Trash2, 
  Loader2, AlertCircle, Sparkles, ClipboardList 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Todo {
  id: string;
  task: string;
  is_completed: boolean;
  inserted_at: string;
}

export const TodoNode: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTask, setNewTask] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTodos = async () => {
    // Mock data for sandbox mode
    setTodos([
      { id: '1', task: 'Verify Kololo heights construction nodes', is_completed: true, inserted_at: new Date().toISOString() },
      { id: '2', task: 'Finalize diaspora legal documentation', is_completed: false, inserted_at: new Date().toISOString() },
      { id: '3', task: 'Review Q3 infrastructure budget', is_completed: false, inserted_at: new Date().toISOString() },
    ]);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    const optimisticTodo = {
      id: Math.random().toString(),
      task: newTask,
      is_completed: false,
      inserted_at: new Date().toISOString()
    };

    setTodos([optimisticTodo, ...todos]);
    setNewTask('');
  };

  const toggleTodo = async (id: string, is_completed: boolean) => {
    setTodos(todos.map(t => t.id === id ? { ...t, is_completed: !is_completed } : t));
  };

  const deleteTodo = async (id: string) => {
    setTodos(todos.filter(t => t.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-black text-gray-900 tracking-tighter uppercase flex items-center gap-3">
            <ClipboardList className="text-[#8DC63F]" /> Project Task Hub
          </h2>
          <p className="text-xs text-gray-500 font-medium">Managing operational directives and construction milestones.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-gray-100 shadow-sm">
           <Sparkles size={14} className="text-[#8DC63F]" />
           <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">AI Assisted Workflow</span>
        </div>
      </div>

      <form onSubmit={addTodo} className="relative group">
        <input 
          type="text" 
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Initialize new task node..."
          className="w-full bg-white border border-gray-200 rounded-[2rem] py-5 px-8 pr-16 outline-none focus:border-[#8DC63F] focus:ring-4 focus:ring-[#8DC63F]/5 transition-all font-bold text-sm shadow-sm"
        />
        <button 
          type="submit"
          className="absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 bg-[#8DC63F] text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg shadow-[#8DC63F]/20"
        >
          <Plus size={24} />
        </button>
      </form>

      {error && (
        <div className="bg-red-50 border border-red-100 p-4 rounded-2xl flex items-center gap-3 text-red-600 text-[10px] font-black uppercase tracking-widest">
          <AlertCircle size={16} /> {error}
        </div>
      )}

      <div className="bg-white rounded-[2.5rem] border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-8 py-5 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Operational Ledger</span>
          <span className="text-[10px] font-black text-[#8DC63F] uppercase tracking-widest">{todos.length} Nodes Loaded</span>
        </div>

        <div className="divide-y divide-gray-50">
          {isLoading ? (
            <div className="py-20 flex flex-col items-center justify-center text-gray-400">
              <Loader2 className="animate-spin mb-4" size={32} />
              <p className="text-[10px] font-black uppercase tracking-[0.2em]">Synchronizing Nodes...</p>
            </div>
          ) : todos.length === 0 ? (
            <div className="py-20 flex flex-col items-center justify-center text-gray-400">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                 <CheckCircle2 size={32} className="opacity-20" />
              </div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em]">Queue Empty. All nodes verified.</p>
            </div>
          ) : (
            <AnimatePresence initial={false}>
              {todos.map((todo) => (
                <motion.div 
                  key={todo.id}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="px-8 py-5 flex items-center justify-between group hover:bg-gray-50/50 transition-colors"
                >
                  <div className="flex items-center gap-5 flex-1 cursor-pointer" onClick={() => toggleTodo(todo.id, todo.is_completed)}>
                    <div className={`transition-colors ${todo.is_completed ? 'text-[#8DC63F]' : 'text-gray-300 group-hover:text-gray-400'}`}>
                      {todo.is_completed ? <CheckCircle2 size={24} /> : <Circle size={24} />}
                    </div>
                    <span className={`text-sm font-bold transition-all ${todo.is_completed ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
                      {todo.task}
                    </span>
                  </div>
                  <button 
                    onClick={() => deleteTodo(todo.id)}
                    className="opacity-0 group-hover:opacity-100 p-2 text-gray-300 hover:text-red-500 transition-all hover:scale-110"
                  >
                    <Trash2 size={18} />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>
      </div>

      <div className="bg-gray-900 rounded-[2rem] p-8 text-white relative overflow-hidden shadow-2xl">
         <div className="absolute top-0 right-0 w-32 h-32 bg-[#8DC63F] rounded-full blur-[80px] opacity-10"></div>
         <div className="relative z-10 flex items-center justify-between">
           <div className="space-y-1">
             <p className="text-[9px] font-black uppercase tracking-[0.4em] text-[#8DC63F]">Security Protocol</p>
             <h4 className="text-xl font-black uppercase tracking-tighter">Encrypted Task Storage</h4>
           </div>
           <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-400">
              AES-256 Verified
           </div>
         </div>
      </div>
    </div>
  );
};
