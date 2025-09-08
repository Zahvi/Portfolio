import { motion } from 'framer-motion';

     function LandingPageComponent()
     {
       const HeroTitle = "Welcome to My Portfolio";
       const HeroSubtitle = "Hi, I'm Mikal, a passionate software developer specializing in C#, Blazor, and modern web technologies.";
       const CtaText = "Explore My Work";

       return (
         <motion.section
           initial={{ opacity: 0, y: 50 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8 }}
           className="min-h-screen custom-gradient flex flex-col items-center justify-center text-white px-4"
         >
           <h1 className="text-5xl md:text-6xl font-bold mb-4 text-center">
             {HeroTitle}
           </h1>
           <p className="text-xl md:text-2xl mb-8 text-center max-w-2xl">
             {HeroSubtitle}
           </p>
           <a
             href="#portfolio"
             className="bg-white text-blue-600 font-semibold py-3 px-6 rounded-full hover:bg-blue-100 transition duration-300"
           >
             {CtaText}
           </a>
         </motion.section>
       );
     }

     export default LandingPageComponent;