import { Shield, Code, Database, Globe } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useState, useEffect, useRef } from 'react';

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const skillCategories = [
    {
      icon: Shield,
      title: "Cybersecurity",
      skills: ["Ethical Hacking", "Penetration Testing", "Security Analysis", "Vulnerability Assessment", "Social Engineering", "Network Security"],
      color: "text-red-400"
    },
    {
      icon: Code,
      title: "Programming Languages",
      skills: ["Python", "JavaScript", "SQL", "Bash Scripting", "HTML/CSS"],
      color: "text-blue-400"
    },
    {
      icon: Globe,
      title: "Web Technologies",
      skills: ["React.js", "Node.js", "Express.js", "MongoDB", "RESTful APIs", "Blockchain"],
      color: "text-green-400"
    },
    {
      icon: Database,
      title: "Tools & Platforms",
      skills: ["Kali Linux", "Metasploit", "Burp Suite", "Wireshark", "Nmap", "Git/GitHub"],
      color: "text-yellow-400"
    }
  ];

  return (
    <section ref={sectionRef} id="skills" className="py-20">
      <div className={`section-container transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-glow">
            My <span className="text-accent">Skills</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A comprehensive toolkit spanning cybersecurity, development, and emerging technologies
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category, index) => (
            <Card 
              key={index} 
              className={`cyber-card group hover:scale-105 transition-all duration-700 ${
                isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-4'
              }`}
              style={{ 
                transitionDelay: isVisible ? `${index * 200}ms` : '0ms' 
              }}
            >
              <CardHeader className="text-center pb-4">
                <category.icon className={`w-12 h-12 mx-auto mb-3 ${category.color} group-hover:animate-glow-pulse`} />
                <CardTitle className="text-lg font-semibold text-foreground">
                  {category.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <Badge 
                      key={skillIndex} 
                      variant="secondary"
                      className="text-xs bg-muted/50 hover:bg-accent/20 hover:text-accent transition-colors"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Progress Bars for Key Skills */}
        <div className={`mt-16 max-w-4xl mx-auto transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h3 className="text-2xl font-bold text-center mb-8 text-foreground">Proficiency Levels</h3>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { skill: "Ethical Hacking", level: 85 },
              { skill: "React.js Development", level: 90 },
              { skill: "Python Programming", level: 88 },
              { skill: "Cybersecurity Analysis", level: 82 },
              { skill: "Node.js Backend", level: 85 },
              { skill: "Blockchain Technology", level: 75 }
            ].map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-foreground font-medium">{item.skill}</span>
                  <span className="text-accent">{item.level}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-cyber rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${item.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;