import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { ArrowRight, Download, Mail } from 'lucide-react';
import { useState, useEffect } from 'react';
import profileImage from '@/assets/profile.jpg';
import ThreeBackground from './ThreeBackground';

const Hero = () => {
  const [isHomeVisible, setIsHomeVisible] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHomeVisible(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    const homeSection = document.getElementById('home');
    if (homeSection) observer.observe(homeSection);

    return () => {
      if (homeSection) observer.unobserve(homeSection);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 md:pt-0"
      >
        {/* 3D Animated Background */}
        <ThreeBackground />

        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-background/40" />

        {/* Content */}
        <div className="relative z-10 section-container">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
            {/* Content Section */}
            <div className="flex-1 text-center lg:text-left animate-fade-in">
              {/* Name */}
              <h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in text-glow"
                style={{
                  animationDelay: '0.2s',
                  animationFillMode: 'both',
                }}
              >
                Hi, I'm Bandi Naga Jagadish
              </h1>

              {/* Subtitle */}
              <p
                className="text-xl md:text-2xl text-muted-foreground mb-4 animate-fade-in"
                style={{
                  animationDelay: '0.4s',
                  animationFillMode: 'both',
                }}
              >
                Cybersecurity Enthusiast & Full Stack Developer
              </p>

              {/* Description */}
              <p
                className="text-lg text-muted-foreground mb-16 max-w-2xl mx-auto lg:mx-0 animate-fade-in"
                style={{
                  animationDelay: '0.6s',
                  animationFillMode: 'both',
                }}
              >
                B.Tech Cyber Security student passionate about ethical hacking,
                secure web development, and blockchain-based solutions. Turning
                cybersecurity challenges into innovative solutions.
              </p>
            </div>

            {/* Profile Image */}
            <div
              className="flex-shrink-0 animate-fade-in"
              style={{
                animationDelay: '0.2s',
                animationFillMode: 'both',
              }}
            >
              <Avatar className="w-64 h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 border-4 border-accent/50 shadow-elegant">
                <AvatarImage
                  src={profileImage}
                  alt="Bandi Naga Jagadish"
                />
                <AvatarFallback className="text-4xl font-bold bg-accent/20 text-accent">
                  BJ
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Buttons - Only show when home section is visible & on larger screens */}
      {isHomeVisible && (
        <div className="hidden sm:block fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-4xl px-4 pb-4 bg-background/80 backdrop-blur-md z-50">
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in"
            style={{
              animationDelay: '0.8s',
              animationFillMode: 'both',
            }}
          >
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
              className="border-accent text-accent hover:bg-accent hover:text-accent-foreground relative overflow-visible"
              onClick={() => {
                window.open(
                  'https://drive.google.com/uc?export=download&id=1CLkiys2s1a0RzJ6TZI0x3QFy5dNDfDkm',
                  '_blank'
                );
              }}
            >
              <Download className="w-5 h-5 mr-2" />
              Download Resume

              {/* Mouse Click Animation */}
              <div
                className="absolute -top-6 -left-10 animate-mouse-click z-50"
                style={{ animationDelay: '1s' }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-white drop-shadow-md"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M3 2a.5.5 0 0 1 .5.5v5.793l1.146-1.147a.5.5 0 0 1 .708.708L4.207 9.207l1.647 1.646a.5.5 0 0 1-.708.708L3.5 9.914V15.5a.5.5 0 0 1-1 0v-13A.5.5 0 0 1 3 2z" />
                </svg>
              </div>

              <div className="absolute -right-8 top-1/2 transform -translate-y-1/2 animate-bounce">
                <div className="w-4 h-6 border-2 border-accent rounded-full flex justify-center">
                  <div className="w-0.5 h-2 bg-accent rounded-full mt-1 animate-pulse" />
                </div>
              </div>
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
      )}
    </>
  );
};

export default Hero;
