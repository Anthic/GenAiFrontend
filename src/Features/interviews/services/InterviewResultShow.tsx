import  { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { useParams } from "react-router-dom";
import { InterviewAPI } from "../api/interviewApi";
import { 
  Code2, 
  Users, 
  Map as MapIcon, 
  ChevronRight, 
  AlertTriangle,
  Lightbulb,
  Crosshair,
  Award,
  Check
} from "lucide-react";

type Tab = "technical" | "behavioral" | "roadmap";

export default function InterviewResultShow() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState<Tab>("technical");
  const [interviewData, setInterviewData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Fetch Report Data from API
  useEffect(() => {
    const fetchReport = async () => {
      if (!id) return;
      try {
        setIsLoading(true);
        const response = await InterviewAPI.getReportById(id);
        if (response.success) {
          setInterviewData(response.data);
        }
      } catch (error) {
        console.error("Fetch Data Error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReport();
  }, [id]);

  // Initial enter animation (triggers only after data loads)
  useEffect(() => {
    if (isLoading || !interviewData) return;

    const ctx = gsap.context(() => {
      gsap.from(".slide-up", {
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        clearProps: "transform", // ensures it doesn't break scrolling or layouts
      });
      
      gsap.from(".fade-in", {
        opacity: 0,
        duration: 1,
        delay: 0.3,
      });

      // Background ambient pulse
      gsap.to(".bg-glow-pulse", {
        opacity: 0.5,
        scale: 1.05,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, containerRef);

    return () => ctx.revert();
  }, [isLoading, interviewData]);

  // Animate content on tab switch
  useEffect(() => {
    if (contentRef.current && !isLoading && interviewData) {
      gsap.fromTo(
        contentRef.current.children,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.05, ease: "power2.out" }
      );
    }
  }, [activeTab, isLoading, interviewData]);

  const getSeverityStyle = (severity: string) => {
    switch (severity.toLowerCase()) {
      case "high":
        return "border-red-500/30 bg-red-500/10 text-red-400";
      case "medium":
        return "border-orange-500/30 bg-orange-500/10 text-orange-400";
      case "low":
        return "border-blue-500/30 bg-blue-500/10 text-blue-400";
      default:
        return "border-gray-500/30 bg-gray-500/10 text-gray-400";
    }
  };

  // Loading Screen
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#050314] flex flex-col items-center justify-center text-white font-sans selection:bg-purple-500/40">
        <div className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mb-6" />
        <h2 className="text-xl font-medium tracking-wide">Analyzing AI Report Data...</h2>
        <p className="text-gray-500 mt-2">This may take a moment</p>
      </div>
    );
  }

  // Not Found Screen
  if (!interviewData) {
    return (
      <div className="min-h-screen bg-[#050314] flex flex-col items-center justify-center text-white font-sans selection:bg-purple-500/40">
        <AlertTriangle size={56} className="text-red-500/80 mb-6 drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]" />
        <h2 className="text-2xl font-bold mb-3">Report Not Found</h2>
        <p className="text-gray-400 text-center max-w-sm">
          The requested interview report does not exist, or you may not have permission to view it.
        </p>
      </div>
    );
  }

  // Safe checks for the API response structure to prevent mapping errors if API returns missing arrays
  const technicalQuestions = interviewData.technicalQuestions || [];
  const behaviouralQuestions = interviewData.behaviouralQuestions || [];
  const preparationGap = interviewData.preparationGap || [];
  const skillGap = interviewData.skillGap || [];

  return (
    <div 
      ref={containerRef}
      className="min-h-screen xl:h-screen w-full bg-[#050314] text-white font-sans overflow-x-hidden xl:overflow-hidden relative flex flex-col selection:bg-purple-500/40 pb-10 xl:pb-0"
    >
      {/* Background Gradients */}
      <div className="fixed top-[-20%] right-[-10%] w-[800px] h-[800px] bg-blue-600/10 blur-[150px] rounded-full bg-glow-pulse pointer-events-none" />
      <div className="fixed bottom-[-20%] left-[-10%] w-[800px] h-[800px] bg-purple-600/10 blur-[150px] rounded-full bg-glow-pulse pointer-events-none" />

      {/* Header */}
      <header className="h-16 md:h-20 border-b border-white/10 flex items-center px-4 md:px-8 z-10 bg-[#050314]/50 backdrop-blur-md slide-up shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-indigo-400 rounded-lg rotate-12 flex items-center justify-center">
            <div className="w-3 h-3 bg-[#050314] rounded-sm rotate-45" />
          </div>
          <span className="text-xl font-bold tracking-tight">InterviewFlow</span>
        </div>
        <div className="ml-auto flex items-center gap-2 md:gap-4">
           <span className="text-xs md:text-sm text-gray-400 hidden sm:inline-block">Analysis Complete</span>
           <span className="text-xs text-gray-400 sm:hidden">Done</span>
           <div className="h-1.5 w-1.5 md:h-2 md:w-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)] animate-pulse" />
        </div>
      </header>

      {/* Main Grid Interface */}
      <main className="flex-1 flex flex-col xl:flex-row xl:overflow-hidden z-10 p-3 md:p-6 gap-4 md:gap-6 max-w-[1600px] mx-auto w-full">
        
        {/* Left Column (Nav & Score) */}
        <aside className="w-full xl:w-72 shrink-0 flex flex-col md:flex-row xl:flex-col gap-4 md:gap-6 slide-up">
          
          {/* Match Score Card */}
          <div className="bg-white/[0.02] border border-white/10 rounded-2xl md:rounded-3xl p-5 md:p-6 w-full md:w-1/2 xl:w-full relative overflow-hidden group hover:border-purple-500/30 transition-colors">
            <div className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-purple-500/10 blur-3xl group-hover:bg-purple-500/20 transition-colors" />
            <h3 className="text-sm font-medium text-gray-400 flex items-center gap-2 mb-2 md:mb-4">
              <Award size={16} className="text-purple-400" />
              Match Score
            </h3>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl md:text-6xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-500">
                {interviewData.matchScore || 0}
              </span>
              <span className="text-lg md:text-xl text-gray-500 font-bold">/100</span>
            </div>
            
            {/* Simple progress bar */}
            <div className="w-full h-1 md:h-1.5 bg-white/5 rounded-full mt-4 md:mt-6 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full" 
                style={{ width: `${interviewData.matchScore || 0}%` }} 
              />
            </div>
            <p className="text-xs text-green-400 mt-2 md:mt-3 font-medium flex items-center gap-1">
              <Check size={12} /> Assessed by AI Model
            </p>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 w-full md:w-1/2 xl:w-full bg-white/[0.02] border border-white/10 rounded-2xl md:rounded-3xl p-3 md:p-4 flex flex-col gap-2">
            <div className="flex flex-col gap-2 w-full h-full justify-center">
              {[
                { id: "technical", label: "Technical Questions", icon: Code2 },
                { id: "behavioral", label: "Behavioral Questions", icon: Users },
                { id: "roadmap", label: "Preparation Roadmap", icon: MapIcon }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as Tab)}
                  className={`flex items-center gap-2 md:gap-3 px-3 md:px-4 py-3 md:py-3.5 rounded-xl md:rounded-2xl transition-all duration-300 w-full ${
                    activeTab === tab.id
                      ? "bg-gradient-to-r from-purple-500/20 to-transparent border border-purple-500/30 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]"
                      : "text-gray-400 hover:bg-white/5 hover:text-gray-200 border border-transparent"
                  }`}
                >
                  <tab.icon size={18} className={`shrink-0 ${activeTab === tab.id ? "text-purple-400" : "opacity-70"}`} />
                  <span className="font-medium text-[13px] md:text-[15px] text-left flex-1">{tab.label}</span>
                  {activeTab === tab.id && <ChevronRight size={16} className="text-purple-400 hidden sm:block" />}
                </button>
              ))}
            </div>
          </nav>

        </aside>

        {/* Center Column (Main Content) */}
        <section className="flex-1 w-full bg-white/[0.02] border border-white/10 rounded-2xl md:rounded-3xl overflow-hidden flex flex-col slide-up relative min-h-[500px] xl:min-h-0">
          
          <div className="px-4 md:px-8 py-4 md:py-6 border-b border-white/10 flex items-center justify-between bg-white/[0.01]">
            <h2 className="text-lg md:text-xl font-bold text-white capitalize flex items-center gap-2">
              {activeTab === "technical" && <Code2 className="text-blue-400" />}
              {activeTab === "behavioral" && <Users className="text-green-400" />}
              {activeTab === "roadmap" && <MapIcon className="text-orange-400" />}
              {activeTab === "roadmap" ? "Roadmap" : <span className="hidden sm:inline-block">{activeTab} Assessment</span>}
              {activeTab !== "roadmap" && <span className="sm:hidden">{activeTab}</span>}
            </h2>
            <span className="text-sm px-3 py-1 bg-white/5 rounded-full text-gray-400 border border-white/10 whitespace-nowrap">
              {activeTab === 'roadmap' ? `${preparationGap.length} Days` : `${activeTab === "technical" ? technicalQuestions.length : behaviouralQuestions.length} Items`}
            </span>
          </div>

          <div 
            ref={contentRef}
            className="flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-8 flex flex-col gap-4 md:gap-6 lg:border-none border-b border-white/5 sm:scrollbar-thin sm:scrollbar-thumb-white/10 sm:scrollbar-track-transparent pr-2 md:pr-4"
          >
            {/* Technical or Behavioral Questions View */}
            {(activeTab === "technical" || activeTab === "behavioral") && (
              (activeTab === "technical" ? technicalQuestions : behaviouralQuestions).map((q: any, idx: number) => (
                <div key={idx} className="bg-[#0A0D18] border border-white/5 rounded-2xl p-4 md:p-6 hover:border-white/10 transition-colors w-full">
                  <div className="flex gap-3 md:gap-4 flex-col sm:flex-row">
                    <div className="shrink-0 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-sm font-bold text-gray-400 border border-white/10 pt-[1px] hidden sm:flex">
                      {idx + 1}
                    </div>
                    <div className="space-y-3 md:space-y-4 flex-1">
                      <h3 className="text-base md:text-lg font-medium text-white leading-relaxed flex gap-2">
                        <span className="text-purple-400 font-bold sm:hidden">{idx + 1}.</span> 
                        {q.question}
                      </h3>
                      <div className="space-y-3 bg-white/[0.02] p-3 md:p-4 rounded-xl border border-white/5">
                        <div>
                          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 md:mb-1.5 flex items-center gap-1.5"><Lightbulb size={12}/> Example Answer</p>
                          <p className="text-gray-300 text-sm md:text-[15px] leading-relaxed">{q.answer}</p>
                        </div>
                        <div className="pt-2 md:pt-3 border-t border-white/5">
                          <p className="text-xs font-semibold text-purple-400/80 uppercase tracking-wider mb-1 md:mb-1.5 flex items-center gap-1.5"><Crosshair size={12}/> Interviewer Intention</p>
                          <p className="text-gray-400 text-xs md:text-sm leading-relaxed">{q.intention}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}

            {/* Roadmap View */}
            {activeTab === "roadmap" && (
              <div className="relative before:absolute before:inset-0 before:ml-[1.4rem] before:w-px before:bg-gradient-to-b before:from-purple-500/50 before:via-white/10 before:to-transparent space-y-6 md:space-y-8 pl-1">
                {preparationGap.map((dayPlan: any, idx: number) => (
                  <div key={idx} className="relative pl-10 md:pl-12">
                    {/* Timeline Dot */}
                    <div className="absolute left-[-5px] top-1 w-10 h-10 rounded-full bg-[#050314] flex items-center justify-center z-10">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center shadow-[0_0_15px_rgba(249,115,22,0.3)] border-2 border-[#050314]">
                        <span className="text-xs font-bold text-white">D{dayPlan.day}</span>
                      </div>
                    </div>
                    
                    <div className="bg-[#0A0D18] border border-white/5 rounded-xl md:rounded-2xl p-4 md:p-6 hover:border-white/10 transition-colors">
                      <h3 className="text-base md:text-lg font-semibold text-white mb-3 md:mb-4 flex items-center gap-2">
                        {dayPlan.focus}
                      </h3>
                      <ul className="space-y-2 md:space-y-3">
                        {dayPlan.tasks.map((task: string, tIdx: number) => (
                          <li key={tIdx} className="flex items-start gap-2 md:gap-3">
                            <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-orange-400/50 shrink-0" />
                            <span className="text-gray-300 text-sm md:text-[15px] leading-relaxed">{task}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {/* End spacer */}
            <div className="h-4 shrink-0" />
          </div>
        </section>

        {/* Right Column (Skill Gaps) */}
        <aside className="w-full xl:w-80 shrink-0 flex flex-col gap-4 md:gap-6 slide-up pb-10 xl:pb-0">
          
          <div className="bg-white/[0.02] border border-white/10 rounded-2xl md:rounded-3xl p-5 md:p-6 flex flex-col xl:h-full relative overflow-hidden">
            <div className="absolute top-0 left-0 w-32 h-32 bg-blue-500/10 blur-3xl pointer-events-none" />
            
            <div className="flex items-center gap-2 mb-4 md:mb-6">
              <AlertTriangle size={18} className="text-orange-400" />
              <h3 className="font-semibold text-lg text-white">Skill Gaps</h3>
            </div>
            
            <p className="text-xs md:text-sm text-gray-400 mb-4 md:mb-6 leading-relaxed">
              Based on the job description, focus on acquiring these missing skills to strengthen your profile.
            </p>
            
            <div className="flex flex-wrap gap-2.5">
              {skillGap.map((gap: any, idx: number) => (
                <div 
                  key={idx} 
                  className={`px-3 py-1.5 rounded-lg border flex items-center gap-2 backdrop-blur-sm text-xs md:text-sm font-medium transition-all hover:-translate-y-0.5 ${getSeverityStyle(gap.severity)}`}
                >
                  {gap.skill}
                </div>
              ))}
            </div>

            <div className="mt-8 xl:mt-auto pt-4 md:pt-8 border-t border-white/5 xl:border-none">
              <div className="p-3 md:p-4 rounded-xl bg-gradient-to-br from-white/5 to-transparent border border-white/5">
                <p className="text-[10px] md:text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">Severity Legend</p>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-2 text-red-400"><div className="w-2 h-2 rounded-full bg-red-400"/> Critical for role</div>
                  <div className="flex items-center gap-2 text-orange-400"><div className="w-2 h-2 rounded-full bg-orange-400"/> Important</div>
                  <div className="flex items-center gap-2 text-blue-400"><div className="w-2 h-2 rounded-full bg-blue-400"/> Good to have</div>
                </div>
              </div>
            </div>

          </div>

        </aside>

      </main>
    </div>
  );
}
