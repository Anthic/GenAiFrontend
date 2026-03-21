import { axiosInstace } from "../../../lib/axiosInstace";
import type { GenerateReportPayload } from "../Types/interview.type";

export const InterviewAPI = {
  //generate interview report (json)
  generateReport: async (data: GenerateReportPayload) => {
    const formData = new FormData();
    formData.append("resume", data.resume);
    formData.append("jobDescription", data.jobDescription);
    formData.append("selfDescription", data.selfDescription);
    const response = await axiosInstace.post("/interview/report", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  //download pdf resume
  dowloadResumePdf: async (data: GenerateReportPayload) => {
    const formData = new FormData();
    formData.append("resume", data.resume);
    formData.append("jobDescription", data.jobDescription);
    formData.append("selfDescription", data.selfDescription);

    const response = await axiosInstace.post(
      "/interview/resume-pdf",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
        responseType: "blob",
      },
    );
    return response.data;
  },

  getMyReports: async () => {
    const response = await axiosInstace.get("/interview/my-reports");
    return response.data;
  },
  getReportById: async (id: string) => {
    const response = await axiosInstace.get(`/interview/report/${id}`);
    return response.data;
  },
};
