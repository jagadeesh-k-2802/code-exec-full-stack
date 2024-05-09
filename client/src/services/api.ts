interface ExecuteRequestBody {
  code: string;
  language: string;
  input: string;
}

interface ExecuteResponse {
  isDone: boolean;
  output?: string;
  time?: number;
}

interface UploadResponse {
  id: string;
}

const sendExecuteRequest = async (
  param: ExecuteRequestBody
): Promise<UploadResponse> => {
  const res = await fetch('/api/code/upload', {
    method: 'POST',
    body: JSON.stringify(param),
    headers: { 'Content-Type': 'application/json' }
  });

  return (await res.json()) as UploadResponse;
};

const fetchExecutionStatus = async (id: string) => {
  const res = await fetch(`/api/code/status/${id}`, {
    headers: { 'Content-Type': 'application/json' }
  });

  return (await res.json()) as ExecuteResponse;
};

export { sendExecuteRequest, fetchExecutionStatus };
