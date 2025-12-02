
export interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  image: string;
  demoUrl?: string;
  codeUrl?: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: 'Buzz',
    description: 'A social media platform allowing users to connect, share posts, and engage with content.',
    tags: ['React', 'Node.js', 'MongoDB'],
    image: 'https://i.ibb.co/7TML0nQ/Screenshot-2025-05-19-014707.png',
    demoUrl: 'https://buzz-fe-1.vercel.app',
    codeUrl: 'https://github.com/Kuldeep2602/buzz'
  },
  {
    id: 2,
    title: 'CI/CD Pipeline with GitHub Actions & AWS',
    description: 'Implemented a zero-downtime CI/CD pipeline with GitHub Actions for automated deployment to AWS EC2, managed by PM2.',
    tags: ['GitHub Actions', 'AWS EC2', 'Next.js', 'PM2'],
    image: 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?auto=format&fit=crop&w=600&q=75',
    demoUrl: 'https://ci-cd-bday.vercel.app/',
    codeUrl: 'https://lnkd.in/gxq4nsZb'
  },
  {
    id: 3,
    title: 'E-Commerce Platform',
    description: 'An e-commerce app with secure Google OAuth/JWT authentication and seamless Razorpay payment integration.',
    image: '/images/ecommerce-new.png',
    demoUrl: 'https://e-com-ashen-iota.vercel.app',
    codeUrl: 'https://github.com/Kuldeep2602/e-commerce',
    tags: ['React', 'Node.js', 'Express', 'Tailwind', 'OAuth', 'Razorpay']
  },
  {
    id: 4,
    title: 'Chat-Room',
    description: 'A real-time chat application with Socket.IO. Create/join rooms and chat instantly.',
    tags: ['React', 'Socket.IO', 'Node.js'],
    image: 'https://i.ibb.co/gM4K5mTV/Screenshot-2025-05-19-015559.png',
    demoUrl: 'https://chat-app-fe-psi.vercel.app/',
    codeUrl: 'https://github.com/Kuldeep2602/chat_app_be'
  },
  {
    id: 5,
    title: 'Vigovia Travel Platform',
    description: 'A comprehensive travel planning platform with detailed pdf generator.',
    tags: ['React', 'Node.js', 'MongoDB', 'Authentication', 'Responsive Design'],
    image: 'https://images.unsplash.com/photo-1503220317375-aaad61436b1b?auto=format&fit=crop&w=600&q=75',
    demoUrl: 'https://vigovia-travel.vercel.app',
    codeUrl: 'https://github.com/Kuldeep2602/vigovia-travel'
  },
  {
    id: 6,
    title: 'News App',
    description: 'A modern news application with real-time updates and bookmark functionality.',
    tags: ['React Native', 'API', 'Firebase'],
    image: 'https://i.ibb.co/8nnLfHDD/Screenshot-2025-05-19-020139.png',
    demoUrl: 'https://expo.dev/accounts/kuldeepsingh1637/projects/news-app/builds/f9a57e9e-3d55-4644-983d-a059ba1c0e35',
    codeUrl: 'https://github.com/Kuldeep2602/news-app'
  },
];
