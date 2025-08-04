import { Shield, GraduationCap, Target, Code } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const About = () => {
  const highlights = [
    {
      icon: Shield,
      title: "Cybersecurity Focus",
      description: "Specializing in ethical hacking and security analysis"
    },
    {
      icon: Code,
      title: "Full Stack Development",
      description: "React.js, Node.js, and blockchain technologies"
    },
    {
      icon: Target,
      title: "Problem Solver",
      description: "Turning complex challenges into innovative solutions"
    },
    {
      icon: GraduationCap,
      title: "Continuous Learning",
      description: "Always pursuing growth in cybersecurity and development"
    }
  ];

  return (
    <section id="about" className="py-20 bg-gradient-dark">
      <div className="section-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-glow">
            About <span className="text-accent">Me</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Passionate about cybersecurity and development, I'm on a mission to create secure, 
            innovative solutions in the digital world.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Bio */}
          <div className="space-y-6">
            <div className="prose prose-invert max-w-none">
              <p className="text-lg leading-relaxed text-muted-foreground">
                I'm a 4th-year <span className="text-accent font-semibold">B.Tech Cyber Security</span> student 
                passionate about ethical hacking, secure web development, and blockchain-based solutions. 
                I thrive in tech challenges, actively engage in hackathons, and continuously pursue 
                professional growth in cybersecurity and development.
              </p>
              
              <p className="text-lg leading-relaxed text-muted-foreground mt-4">
                My journey combines the analytical mindset of cybersecurity with the creative 
                problem-solving of full-stack development. Whether it's simulating phishing attacks 
                for awareness or building secure blockchain voting systems, I'm committed to 
                making the digital world safer and more innovative.
              </p>
            </div>

            {/* Education */}
            <Card className="cyber-card">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <GraduationCap className="w-8 h-8 text-accent mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Educational Background</h3>
                    <p className="text-accent font-medium">A.M Reddy Memorial College of Engineering and Technology</p>
                    <p className="text-muted-foreground">Narasaraopet, Andhra Pradesh</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      B.Tech in Cyber Security — <span className="text-accent">Currently Pursuing (Final Year)</span>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Highlights */}
          <div className="grid sm:grid-cols-2 gap-6">
            {highlights.map((highlight, index) => (
              <Card key={index} className="cyber-card group hover:scale-105">
                <CardContent className="p-6 text-center">
                  <highlight.icon className="w-12 h-12 text-accent mx-auto mb-4 group-hover:animate-glow-pulse" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {highlight.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {highlight.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;