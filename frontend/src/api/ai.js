import axiosInstance from "../lib/axios";

export const aiApi = {
    askChat: async ({ prompt, mode = "chat", context = {} }) => {
        const response = await axiosInstance.post("/ai/chat", { prompt, mode, context });
        return response.data;
    },
};
