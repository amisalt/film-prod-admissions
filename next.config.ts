import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  redirects(){
    return [
      {
        source:"/",
        missing:[
          {
            type:'cookie',
            key:'sb-speubsgojorytnxurkdv-auth-token'
          }
        ],
        permanent:false,
        destination:"/auth"
      }
    ]
  }
};

export default nextConfig;
