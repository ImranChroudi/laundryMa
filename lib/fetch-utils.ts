
const getBaseURL = (): string => {

  if (typeof window !== "undefined") {
    return "";
  }
  return process.env.NEXT_PUBLIC_API_URL || "";
};

const getAuthToken = (): string | null => {
  if (typeof window === "undefined") {
    return null; 
  }
  return localStorage.getItem("tokenLaundryMa");
};

// Create headers with auth token
const createHeaders = (typeHeader?: string, skipContentType = false): Record<string, string> => {
  const headers: Record<string, string> = {};

  if (!skipContentType) {
    headers["Content-Type"] = typeHeader === "multipart" ? "multipart/form-data" : "application/json";
  }

  const token = getAuthToken();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
};

// Handle response errors
const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: "Unknown error" }));
    
    // Handle 401 unauthorized
    if (response.status === 401 && errorData.stop === true) {
      console.log("Force logout", errorData.message);
      if (typeof window !== "undefined") {
        localStorage.removeItem("tokenLaundryMa");
        localStorage.removeItem("userLaundryMa");
        window.location.href = "/admin/login";
      }
    }
    
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }

  return response.json();
};

const postData = async <T>(path: string, data: unknown, typeHeader?: string): Promise<T> => {
  console.log("postData", path, data, typeHeader);
  const baseURL = getBaseURL();
  const url = path.startsWith("/") ? `${baseURL}${path}` : `${baseURL}/${path}`;
  
  const isFormData = data instanceof FormData;
  // Don't set Content-Type for FormData - browser will set it with boundary
  const headers = isFormData ? createHeaders(undefined, true) : createHeaders(typeHeader);

  const response = await fetch(url, {
    method: "POST",
    headers,
    body: isFormData ? data : JSON.stringify(data),
  });

  return handleResponse<T>(response);
};

const fetchData = async <T>(path: string): Promise<T> => {
  const baseURL = getBaseURL();
  const url = path.startsWith("/") ? `${baseURL}${path}` : `${baseURL}/${path}`;

  const response = await fetch(url, {
    method: "GET",
    headers: createHeaders(),
  });

  return handleResponse<T>(response);
};

const updateData = async <T>(path: string, data: unknown, typeHeader?: string): Promise<T> => {
  const baseURL = getBaseURL();
  const url = path.startsWith("/") ? `${baseURL}${path}` : `${baseURL}/${path}`;

  const isFormData = data instanceof FormData;
  // Don't set Content-Type for FormData - browser will set it with boundary
  const headers = isFormData ? createHeaders(undefined, true) : createHeaders(typeHeader);

  const response = await fetch(url, {
    method: "PUT",
    headers,
    body: isFormData ? data : JSON.stringify(data),
  });

  return handleResponse<T>(response);
};

const deleteData = async <T>(path: string): Promise<T> => {
  const baseURL = getBaseURL();
  console.log("deleteData", path);
  const url = path.startsWith("/") ? `${baseURL}${path}` : `${baseURL}/${path}`;
  
  // DELETE requests should not have a body - data should be in URL params
  const response = await fetch(url, {
    method: "DELETE",
    headers: createHeaders(),
    // No body for DELETE requests
  });

  return handleResponse<T>(response);
};

const verifyEmail = async <T>(path: string, data: unknown): Promise<T> => {
  return postData<T>(path, data);
};

export { deleteData, fetchData, postData, updateData, verifyEmail };

