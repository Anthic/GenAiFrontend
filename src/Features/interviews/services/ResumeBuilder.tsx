import gsap from "gsap";
import { Check, Upload, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { InputSection } from "../components/InputSection";
import { InterviewAPI } from "../api/interviewApi";
import { useToast } from "../../../hooks/useToast";

const ResumeBuilder: React.FC = () => {
  const mainContainer = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const uploadRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [jobDescription, setJobDescription] = useState<string>("");
  const [selfDescription, setSelfDescription] = useState<string>("");
  const { showToast } = useToast();

  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const clearFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance Animation
      gsap.from(".animate-item", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "expo.out",
        delay: 0.2,
      });

      // Subtle Background Ambient Animation
      gsap.to(".bg-glow-pulse", {
        opacity: 0.7,
        scale: 1.1,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, mainContainer);

    return () => ctx.revert();
  }, []);

  const onButtonHover = (): void => {
    gsap.to(buttonRef.current, {
      scale: 1.015,
      boxShadow: "0 0 35px rgba(255, 99, 132, 0.5)",
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const onButtonLeave = (): void => {
    gsap.to(buttonRef.current, {
      scale: 1,
      boxShadow: "0 0 15px rgba(255, 99, 132, 0.2)",
      duration: 0.4,
      ease: "power2.in",
    });
  };

  const handleDownloadPdf = async () => {
    if (!file || !jobDescription || !selfDescription) {
      showToast("Please fill all fields!", "error");
      return;
    }
    try {
      setLoading(true);
      showToast("Building your ATS format Resume PDF...", "info");
      const payload = { resume: file, jobDescription, selfDescription };
      const blobInfo = await InterviewAPI.dowloadResumePdf(payload);

      const url = window.URL.createObjectURL(new Blob([blobInfo]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Professional_Resume.pdf");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showToast("Professional Resume ATS PDF downloaded!", "success");
    } catch (error) {
      console.error(error);
      showToast("Something went wrong downloading PDF!", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      ref={mainContainer}
      className="min-h-screen w-full bg-[#050314] text-white font-sans selection:bg-rose-500/40 overflow-x-hidden relative"
    >
      {/* Background Gradients (Pixel Perfect Match) */}
      <div className="fixed top-[-15%] right-[-10%] w-[700px] h-[700px] bg-rose-500/10 blur-[150px] rounded-full bg-glow-pulse" />
      <div className="fixed bottom-[-10%] left-[-10%] w-[800px] h-[800px] bg-red-600/10 blur-[180px] rounded-full bg-glow-pulse" />

      {/* Hero Section */}
      <main className="relative z-10 flex flex-col items-center px-4 pt-16 pb-24 max-w-5xl mx-auto">
        <header className="text-center mb-14 animate-item">
          <h1 className="text-5xl md:text-6xl font-serif mb-5 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-rose-600">
            ATS Resume Builder
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
            Generate a perfect, 1-page ATS-friendly resume optimized for your specific job description.
          </p>
        </header>

        {/* Main Interface Card */}
        <div className="w-full max-w-[860px] bg-[#ffffff04] backdrop-blur-[40px] border border-white/10 rounded-[48px] p-8 md:p-14 shadow-2xl animate-item relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-rose-500/5 via-transparent to-red-500/5 pointer-events-none" />

          <div className="flex flex-col gap-10 relative z-10">
            {/* Upload Area */}
            <div
              ref={uploadRef}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`group relative border-2 border-dashed rounded-3xl p-12 flex flex-col items-center justify-center transition-all duration-500 ${isDragging ? "border-rose-500 bg-rose-500/10" : "border-white/10 bg-white/[0.01] hover:bg-white/[0.03] hover:border-rose-500/30"} cursor-pointer`}
            >
              <div className="mb-5 p-4 bg-white/5 rounded-2xl border border-white/5 transition-transform group-hover:scale-110 duration-500">
                <Upload className="text-rose-400" size={32} />
              </div>
              <p className="text-gray-400 text-[17px] mb-4 text-center">
                Drag and drop your resume PDF here, or{" "}
                <span className="text-white font-medium underline underline-offset-4 decoration-rose-500/50 hover:text-rose-400 transition-colors">
                  browse
                </span>
                .
              </p>

              {file && (
                <div className="relative z-20 flex items-center gap-3 px-5 py-2.5 bg-green-500/10 border border-green-500/20 rounded-full shadow-inner">
                  <span
                    className="text-sm text-green-300 font-medium max-w-[200px] truncate"
                    title={file.name}
                  >
                    {file.name}
                  </span>
                  <div className="flex items-center gap-1.5 border-l border-green-500/20 pl-2">
                    <Check size={16} className="text-green-400" />
                    <button
                      onClick={clearFile}
                      className="text-gray-400 hover:text-red-400 transition-colors bg-transparent border-none cursor-pointer p-0 ml-1 flex items-center justify-center"
                      title="Remove file"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                title=""
                onChange={handleFileChange}
              />
            </div>

            {/* Inputs Section */}
            <InputSection
              label="Job Description"
              placeholder="Paste the target job description here..."
              id="job-desc"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            />

            <InputSection
              label="Self Description"
              placeholder="Provide a quick summary of your strengths and key metrics..."
              id="self-desc"
              value={selfDescription}
              onChange={(e) => setSelfDescription(e.target.value)}
            />

            {/* CTA Button */}
            <button
              onClick={handleDownloadPdf}
              disabled={loading}
              ref={buttonRef}
              onMouseEnter={onButtonHover}
              onMouseLeave={onButtonLeave}
              className="w-full py-5 rounded-2xl bg-gradient-to-r from-[#e11d48] via-[#be123c] to-[#9f1239] text-white font-bold text-xl shadow-[0_10px_30px_rgba(225,29,72,0.4)] transition-all active:scale-95 relative overflow-hidden group disabled:opacity-50"
            >
              <span className="relative z-10">
                {loading ? "Generating PDF..." : "Generate ATS Resume PDF"}
              </span>
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute -inset-1 bg-gradient-to-r from-red-400 to-rose-600 blur opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
            </button>
          </div>
        </div>
      </main>

      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none z-0">
        <div className="absolute top-[15%] left-[10%] w-[300px] h-[300px] bg-red-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] bg-rose-500/10 blur-[150px] rounded-full" />
      </div>
    </div>
  );
};

export default ResumeBuilder;
