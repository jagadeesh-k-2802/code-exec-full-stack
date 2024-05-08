declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      PORT?: number;
      RABBIT_MQ_URL: string;
    }
  }
}

export {};
