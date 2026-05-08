import React, { useState } from 'react';
import { Plus, BookOpen, Utensils, Trash2, Search, Target, TrendingUp, Sparkles } from 'lucide-react';

type Meal = {
  id: string;
  type: string;
  name: string;
  carbs: number;
  protein: number;
  fat: number;
  calories: number;
};

const initialMeals: Meal[] = [
  {
    id: '1',
    type: '점',
    name: '닭가슴살 샐러드',
    carbs: 20,
    protein: 35,
    fat: 12,
    calories: 450,
  },
  {
    id: '2',
    type: '간',
    name: '아메리카노',
    carbs: 0,
    protein: 0,
    fat: 0,
    calories: 5,
  },
];

export default function App() {
  const [meals, setMeals] = useState<Meal[]>(initialMeals);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'keyword'>('dashboard');
  const [topic, setTopic] = useState('');
  const [intents, setIntents] = useState<string[]>([]);
  const [trendWords, setTrendWords] = useState('');
  const [subtitle, setSubtitle] = useState('');

  const toggleIntent = (i: string) => {
    if (intents.includes(i)) setIntents(intents.filter((x) => x !== i));
    else setIntents([...intents, i]);
  };

  const GOAL_CALORIES = 2100;
  const GOAL_CARBS = 250;
  const GOAL_PROTEIN = 120;
  const GOAL_FAT = 60;

  const currentCalories = meals.reduce((sum, meal) => sum + meal.calories, 0);
  const currentCarbs = meals.reduce((sum, meal) => sum + meal.carbs, 0);
  const currentProtein = meals.reduce((sum, meal) => sum + meal.protein, 0);
  const currentFat = meals.reduce((sum, meal) => sum + meal.fat, 0);

  const deleteMeal = (id: string) => {
    setMeals((prev) => prev.filter((meal) => meal.id !== id));
  };

  const getPercentage = (current: number, goal: number) => {
    return Math.min((current / goal) * 100, 100);
  };

  const radius = 64;
  const circumference = 2 * Math.PI * radius;
  const caloriePercentage = getPercentage(currentCalories, GOAL_CALORIES);
  const dashoffset = circumference - (circumference * caloriePercentage) / 100;

  // Formatting date
  const today = new Date();
  const dateOptions: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric', 
    weekday: 'long' 
  };
  const formattedDate = today.toLocaleDateString('ko-KR', dateOptions);

  return (
    <div className="bg-[#F5F0E6] text-[#4A3C31] w-full min-h-screen flex flex-col font-sans border-8 border-[#EFE9DC] shadow-inner">
      <header className="h-20 border-b border-[#4A3C31] flex items-center justify-between px-6 md:px-10 shrink-0">
        <div className="flex items-baseline gap-6">
          <h1 className="text-2xl md:text-3xl font-black tracking-tighter uppercase italic" style={{ fontFamily: "'Georgia', serif" }}>Vibe-Meal</h1>
          <span className="text-xs font-bold uppercase tracking-widest opacity-40 hidden md:block">Volume No. 04 — Performance & Nutrition</span>
        </div>
    <div className="flex items-center gap-6 md:gap-8 text-[10px] md:text-xs font-bold uppercase tracking-widest">
      <span 
        onClick={() => setActiveTab('dashboard')}
        className={`pb-1 cursor-pointer transition-all ${activeTab === 'dashboard' ? 'border-b-2 border-[#4A3C31]' : 'border-b-2 border-transparent opacity-40 hover:opacity-100'}`}
      >
        오늘 대시보드
      </span>
      <span 
        onClick={() => setActiveTab('keyword')}
        className={`pb-1 cursor-pointer transition-all ${activeTab === 'keyword' ? 'border-b-2 border-[#4A3C31]' : 'border-b-2 border-transparent opacity-40 hover:opacity-100'}`}
      >
        키워드 분석
      </span>
      <span className="opacity-40 cursor-pointer hidden sm:block">주간 플래너</span>
      <button className="flex items-center gap-2 hover:opacity-70 transition-opacity">
        <BookOpen className="w-4 h-4" /> <span className="hidden md:inline">사용 방법</span>
      </button>
    </div>
      </header>

  <main className="flex-1 overflow-y-auto lg:overflow-hidden flex flex-col">
    {activeTab === 'dashboard' ? (
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 lg:overflow-hidden min-h-0">
        {/* Left Sidebar */}
        <section className="lg:col-span-3 border-b lg:border-b-0 lg:border-r border-[#4A3C31] p-6 md:p-10 flex flex-col justify-between">
          <div className="space-y-12">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-4 opacity-50">Current Status</p>
              <p className="text-lg md:text-xl font-medium leading-tight">Optimizing for high-performance recovery.</p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-4 opacity-50">Date</p>
              <p className="text-2xl font-light italic" style={{ fontFamily: "'Georgia', serif" }}>
                {formattedDate}
              </p>
            </div>
            <div className="pt-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-6 opacity-50">Macro Distribution</p>
              <div className="space-y-6">
                <div className="relative pb-2">
                  <div className="flex justify-between text-[11px] font-bold uppercase mb-2">
                    <span>탄수화물</span>
                    <span>{currentCarbs}g / {GOAL_CARBS}g</span>
                  </div>
                  <div className="h-[1px] bg-[#4A3C31] opacity-10 w-full"></div>
                  <div 
                    className="absolute bottom-2 h-[2px] bg-[#B57C5A] transition-all duration-500" 
                    style={{ width: `${getPercentage(currentCarbs, GOAL_CARBS)}%` }}>
                  </div>
                </div>
                <div className="relative pb-2">
                  <div className="flex justify-between text-[11px] font-bold uppercase mb-2">
                    <span>단백질</span>
                    <span>{currentProtein}g / {GOAL_PROTEIN}g</span>
                  </div>
                  <div className="h-[1px] bg-[#4A3C31] opacity-10 w-full"></div>
                  <div 
                    className="absolute bottom-2 h-[2px] bg-[#4A3C31] transition-all duration-500" 
                    style={{ width: `${getPercentage(currentProtein, GOAL_PROTEIN)}%` }}>
                  </div>
                </div>
                <div className="relative pb-2">
                  <div className="flex justify-between text-[11px] font-bold uppercase mb-2">
                    <span>지방</span>
                    <span>{currentFat}g / {GOAL_FAT}g</span>
                  </div>
                  <div className="h-[1px] bg-[#4A3C31] opacity-10 w-full"></div>
                  <div 
                    className="absolute bottom-2 h-[2px] bg-[#4A3C31] transition-all duration-500" 
                    style={{ width: `${getPercentage(currentFat, GOAL_FAT)}%` }}>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="text-[10px] font-bold leading-relaxed opacity-40 mt-12 lg:mt-0">
            VIBE-MEAL INTELLIGENCE SYSTEM &copy; 2026<br/>STAY HUNGRY. STAY DISCIPLINED.
          </div>
        </section>

        {/* Center */}
        <section className="lg:col-span-6 p-6 md:p-12 flex flex-col items-center justify-center border-b lg:border-b-0 lg:border-r border-[#4A3C31] relative min-h-[400px]">
          <div className="text-center relative w-full flex flex-col items-center justify-center">
            <div className="mb-4 md:mb-8 z-10">
              <span className="text-[10px] md:text-[12px] font-bold uppercase tracking-[0.4em] opacity-40">Consumed Calories</span>
            </div>
            
            <div className="relative flex justify-center items-center w-full max-w-[300px] md:max-w-none">
              {/* Preserved SVG Progress Bar, integrated into the minimal aesthetic */}
              <svg className="w-[280px] h-[280px] md:w-[320px] md:h-[320px] transform -rotate-90 absolute z-0 opacity-10" viewBox="0 0 160 160">
                <circle cx="80" cy="80" r="64" fill="none" stroke="#4A3C31" strokeWidth="1"></circle>
                <circle 
                  cx="80" 
                  cy="80" 
                  r="64" 
                  fill="none" 
                  stroke="#4A3C31" 
                  strokeWidth="3" 
                  strokeLinecap="square" 
                  strokeDasharray={circumference} 
                  strokeDashoffset={dashoffset}
                  className="transition-all duration-500 ease-in-out"
                ></circle>
              </svg>
              <h2 className="text-[100px] md:text-[160px] font-black leading-none -tracking-[0.05em] italic z-10 text-[#4A3C31] tabular-nums" style={{ fontFamily: "'Georgia', serif" }}>
                {currentCalories}
              </h2>
            </div>

            <div className="flex items-center justify-center gap-4 text-[10px] md:text-sm font-bold uppercase tracking-[0.2em] mt-8 z-10">
              <span className="opacity-40">{currentCalories} Consumed</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#B57C5A]"></span>
              <span className="opacity-40">{GOAL_CALORIES} Daily Goal</span>
            </div>
          </div>

          <div className="mt-12 md:mt-16 w-full max-w-sm grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 border border-[#4A3C31] py-4 px-4 md:px-6 text-[10px] md:text-xs font-bold uppercase tracking-widest hover:bg-[#4A3C31] hover:text-[#F5F0E6] transition-colors">
              Add Meal <Plus className="w-4 h-4"/>
            </button>
            <button className="border border-[#4A3C31] py-4 px-4 md:px-6 text-[10px] md:text-xs font-bold uppercase tracking-widest bg-[#4A3C31] text-[#F5F0E6] hover:bg-[#4A3C31]/80 transition-colors">
              Daily Log
            </button>
          </div>
        </section>

        {/* Right Sidebar */}
        <section className="lg:col-span-3 bg-[#FCFAF8] p-6 md:p-8 flex flex-col lg:overflow-y-auto">
          <div className="mb-8 flex justify-between items-baseline border-b border-[#4A3C31] pb-4">
            <h3 className="text-xl font-bold uppercase tracking-tighter italic flex items-center gap-2" style={{ fontFamily: "'Georgia', serif" }}>
              <Utensils className="w-5 h-5 opacity-40 block" /> 오늘의 식단
            </h3>
            <span className="text-[10px] font-bold opacity-30 uppercase tracking-widest">
              {today.toLocaleDateString('en-US', { month: 'short', day: '2-digit' })}
            </span>
          </div>

          <div className="flex-1 space-y-8">
            {meals.map((meal, idx) => (
              <div key={meal.id} className={`border-l-2 ${idx % 2 === 0 ? 'border-[#4A3C31]' : 'border-[#B57C5A]'} pl-6 py-1 group`}>
                <div className="flex justify-between items-start mb-1">
                  <p className="text-[10px] font-bold uppercase tracking-widest opacity-40 flex items-center gap-2">
                    {meal.type} — MEAL ENTRY
                  </p>
                  <button 
                    onClick={() => deleteMeal(meal.id)}
                    className="text-gray-300 hover:text-red-500 transition-colors md:opacity-0 group-hover:opacity-100" 
                    aria-label="삭제"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <h4 className="text-lg font-bold mb-1">{meal.name}</h4>
                <p className="text-xs italic opacity-60 mb-2" style={{ fontFamily: "'Georgia', serif" }}>
                  탄 {meal.carbs}g · 단 {meal.protein}g · 지 {meal.fat}g
                </p>
                <p className="text-xl font-medium">
                  {meal.calories} <span className="text-[10px] uppercase font-bold opacity-40">kcal</span>
                </p>
              </div>
            ))}
            {meals.length === 0 && (
              <div className="border-l-2 border-[#4A3C31] opacity-20 pl-6 py-1">
                <p className="text-[10px] font-bold uppercase tracking-widest mb-1">Awaiting Entry...</p>
                <h4 className="text-lg font-bold mb-1 italic">No meals logged yet.</h4>
              </div>
            )}
          </div>

          <div className="mt-8 p-6 bg-[#EBE3D5] border border-[#4A3C31]/10 rounded-sm">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-2">Weekly Insight</p>
            <p className="text-xs leading-relaxed opacity-70">
              You are on track with your nutritional goals. Exceptional discipline.
            </p>
          </div>
        </section>
        </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-6 md:p-12 lg:p-16 flex items-start justify-center bg-[#F5F0E6]">
            <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
              {/* Left: Guidance & Inputs */}
              <div className="flex flex-col gap-8 lg:col-span-3">
                <div>
                  <h2 className="text-3xl lg:text-5xl font-black tracking-tighter uppercase italic mb-2" style={{ fontFamily: "'Georgia', serif" }}>
                    Keyword Analyzer
                  </h2>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-50">
                    Step 01. Topic &amp; Intent Identification
                  </p>
                </div>

                <div className="space-y-8 mt-4">
                  <div className="group">
                    <label className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest opacity-60 mb-2">
                      <Target className="w-3 h-3" /> Core Topic
                    </label>
                    <input 
                      type="text" 
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      placeholder="어떤 주제로 작성하시나요? (예: 간헐적 단식)" 
                      className="w-full bg-transparent border-b border-[#4A3C31]/50 py-3 text-lg font-medium focus:outline-none focus:border-[#B57C5A] transition-colors placeholder:opacity-30 text-[#4A3C31]"
                    />
                  </div>

                  <div className="group">
                    <label className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest opacity-60 mb-3">
                      <Search className="w-3 h-3" /> Search Intent
                    </label>
                    <div className="flex flex-wrap gap-2">
                       {['정보 탐색', '문제 해결', '트렌드 확인', '제품/서비스 비교'].map(intent => (
                         <button
                           key={intent}
                           onClick={() => toggleIntent(intent)}
                           className={`text-[10px] font-bold uppercase tracking-widest px-4 py-2 border transition-colors ${
                             intents.includes(intent) 
                               ? 'bg-[#4A3C31] text-[#F5F0E6] border-[#4A3C31]' 
                               : 'border-[#4A3C31]/30 text-[#4A3C31] hover:border-[#4A3C31] hover:bg-[#4A3C31]/5'
                           }`}
                         >
                           {intent}
                         </button>
                       ))}
                    </div>
                  </div>

                  <div className="group">
                    <label className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest opacity-60 mb-2">
                      <TrendingUp className="w-3 h-3" /> Trend Keywords
                    </label>
                    <input 
                      type="text" 
                      value={trendWords}
                      onChange={(e) => setTrendWords(e.target.value)}
                      placeholder="요즘 뜨고 있는 연관어를 적어보세요 (예: 16:8, 혈당 스파이크)" 
                      className="w-full bg-transparent border-b border-[#4A3C31]/50 py-3 text-lg font-medium focus:outline-none focus:border-[#B57C5A] transition-colors placeholder:opacity-30 text-[#4A3C31]"
                    />
                  </div>
                </div>
              </div>

              {/* Right: Output / Drafting */}
              <div className="lg:col-span-2 border border-[#4A3C31]/20 bg-[#FCFAF8] shadow-sm p-8 md:p-10 flex flex-col relative min-h-[400px]">
                <div className="absolute top-0 right-0 p-4">
                  <Sparkles className="w-5 h-5 text-[#B57C5A] opacity-50" />
                </div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-50 mb-8">
                  Step 02. Draft Optimized Subtitle
                </p>

                <div className="flex-1 flex flex-col gap-4">
                  <p className="text-sm italic opacity-70 leading-relaxed" style={{ fontFamily: "'Georgia', serif" }}>
                    * 선택하신 검색 의도 <strong className="not-italic text-[#B57C5A]">{intents.length > 0 ? intents.join(', ') : '...'}</strong>와 트렌드 키워드 <strong className="not-italic text-[#B57C5A]">{trendWords || '...'}</strong>를 조합하여 독자의 시선을 끄는 세부 부제를 작성해보세요.
                  </p>

                  <textarea
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    placeholder="여기에 시선을 끄는 최적화된 부제를 작성하세요..."
                    className="w-full flex-1 min-h-[160px] bg-transparent border border-[#4A3C31]/20 p-4 text-sm font-medium resize-none focus:outline-none focus:border-[#B57C5A] transition-colors placeholder:opacity-30 mt-4 text-[#4A3C31]"
                  />
                </div>

                <div className="mt-8">
                  <button className="w-full border border-[#4A3C31] py-4 text-xs font-bold uppercase tracking-widest bg-[#4A3C31] text-[#F5F0E6] hover:bg-[#4A3C31]/80 transition-colors">
                    Save Subtitle
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
