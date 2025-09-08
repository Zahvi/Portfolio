import { motion } from 'framer-motion';

    function AppComponent()
    {
        const HeroText = "Welcome to My Portfolio";
        return (
            <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="min-h-screen custom-gradient flex items-center justify-center text-white">
            <h1 className="text-4xl font-bold">{HeroText}</h1>
            </motion.div>
        );
    }

    export default AppComponent;