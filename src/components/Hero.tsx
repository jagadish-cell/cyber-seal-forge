import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { ArrowRight, Download, Mail } from 'lucide-react';
import heroBg from '@/assets/hero-bg.webp';
import profileImage from '@/assets/profile.jpg';

const Hero = () => {

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
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-background/70" />
      
      {/* Content */}
      <div className="relative z-10 section-container">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          {/* Content Section */}
          <div className="flex-1 text-center lg:text-left animate-fade-in">
            {/* Name */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in text-glow" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
              Hi, I'm Bandi Naga Jagadish
            </h1>
            
            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-muted-foreground mb-4 animate-fade-in" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
              Cybersecurity Enthusiast & Full Stack Developer
            </p>
            
            {/* Description */}
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto lg:mx-0 animate-fade-in" style={{ animationDelay: '0.6s', animationFillMode: 'both' }}>
              B.Tech Cyber Security student passionate about ethical hacking, secure web development, 
              and blockchain-based solutions. Turning cybersecurity challenges into innovative solutions.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center animate-fade-in" style={{ animationDelay: '0.8s', animationFillMode: 'both' }}>
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
                  window.open('https://drive.google.com/uc?export=download&id=1CLkiys2s1a0RzJ6TZI0x3QFy5dNDfDkm', '_blank');
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

          {/* Profile Image */}
          <div className="flex-shrink-0 animate-fade-in" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
            <Avatar className="w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 border-4 border-accent/50 shadow-elegant">
              <AvatarImage 
                src={profileImage} 
                alt="Bandi Naga Jagadish" 
              />
              <AvatarFallback className="text-3xl font-bold bg-accent/20 text-accent">
                BJ
              </AvatarFallback>
            </Avatar>
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