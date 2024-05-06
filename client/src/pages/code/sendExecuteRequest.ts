interface ExecuteRequestBody {
  code: string;
  language: string;
  input: string;
}

interface ExecuteResponse {
  output: string;
  time: number;
}

const sendExecuteRequest = async (
  param: ExecuteRequestBody
): Promise<ExecuteResponse> => {
  const res = await fetch('/api/code/execute', {
    method: 'POST',
    body: JSON.stringify(param),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  return (await res.json()) as ExecuteResponse;
};

export default sendExecuteRequest;
