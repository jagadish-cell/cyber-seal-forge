import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { ArrowRight, Download, Mail } from 'lucide-react';
import cyberHeroBg from '@/assets/cyber-hero-bg.jpg';
import profileImage from '@/assets/profile.jpg';

const Hero = () => {
  const [text, setText] = useState('');
  const fullText = "Hi, I'm Bandi Naga Jagadish";
  
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < fullText.length) {
        setText(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 100);
    
    return () => clearInterval(timer);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${cyberHeroBg})` }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-background/70" />
      
      {/* Content */}
      <div className="relative z-10 section-container text-center">
        <div className="max-w-4xl mx-auto animate-fade-in">
          {/* Profile Image */}
          <div className="mb-8">
            <Avatar className="w-32 h-32 md:w-40 md:h-40 mx-auto border-4 border-accent/50 shadow-elegant">
              <AvatarImage 
                src={profileImage} 
                alt="Bandi Naga Jagadish" 
              />
              <AvatarFallback className="text-2xl font-bold bg-accent/20 text-accent">
                BJ
              </AvatarFallback>
            </Avatar>
          </div>
          
          {/* Typing Animation */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="text-glow">{text}</span>
            <span className="animate-pulse text-accent">|</span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-4">
            Cybersecurity Enthusiast & Full Stack Developer
          </p>
          
          {/* Description */}
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            B.Tech Cyber Security student passionate about ethical hacking, secure web development, 
            and blockchain-based solutions. Turning cybersecurity challenges into innovative solutions.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              onClick={() => scrollToSection('projects')}
              className="btn-hero group"
              size="lg"
            >
              View My Work
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="border-accent text-accent hover:bg-accent hover:text-accent-foreground"
              onClick={() => {
                // TODO: Replace with actual resume URL when provided
                window.open('#', '_blank');
              }}
            >
              <Download className="w-5 h-5 mr-2" />
              Download Resume
            </Button>
            
            <Button 
              onClick={() => scrollToSection('contact')}
              variant="ghost" 
              size="lg"
              className="text-foreground hover:text-accent"
            >
              <Mail className="w-5 h-5 mr-2" />
              Contact Me
            </Button>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-accent rounded-full flex justify-center">
            <div className="w-1 h-3 bg-accent rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;