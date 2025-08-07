import { Trophy, Medal, Star, Users, Calendar, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useState, useEffect, useRef } from 'react';

const Achievements = () => {
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

  const achievements = [
    {
      icon: Trophy,
      title: "1st Place - College Hackathon",
      description: "Won first place in the annual college hackathon by developing an innovative cybersecurity solution that impressed judges with its technical complexity and real-world applicability.",
      date: "2024",
      category: "Competition",
      color: "text-yellow-400",
      featured: true
    },
    {
      icon: Medal,
      title: "2nd Place - Engineers Day Project Expo",
      description: "Secured second position at the Engineers Day Project Expo for presenting a comprehensive blockchain-based voting system that demonstrated both technical excellence and practical implementation.",
      date: "2023",
      category: "Competition",
      color: "text-blue-400",
      featured: true
    },
    {
      icon: Star,
      title: "Outstanding Academic Performance",
      description: "Maintained excellent academic standing throughout the B.Tech program with consistent high grades in cybersecurity and computer science courses.",
      date: "2022-2026",
      category: "Academic",
      color: "text-green-400",
      featured: false
    },
    {
      icon: Users,
      title: "Active Community Contributor",
      description: "Regular contributor to cybersecurity awareness programs and workshops, helping fellow students understand the importance of digital security.",
      date: "Ongoing",
      category: "Community",
      color: "text-purple-400",
      featured: false
    }
  ];

  const stats = [
    { label: "Competition Wins", value: "2", icon: Trophy },
    { label: "Years of Study", value: "4", icon: Calendar },
    { label: "Projects Completed", value: "10+", icon: Star },
    { label: "Certifications", value: "3", icon: Award }
  ];

  return (
    <section ref={sectionRef} id="achievements" className="py-20 bg-gradient-dark">
      <div className={`section-container transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-glow">
            Achievements & <span className="text-accent">Recognition</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Milestones and recognition that reflect my dedication to excellence in cybersecurity and development
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card 
              key={index} 
              className={`cyber-card text-center group hover:scale-105 transition-all duration-700 ${
                isVisible 
                  ? 'opacity-100 scale-100' 
                  : 'opacity-0 scale-75'
              }`}
              style={{ 
                transitionDelay: isVisible ? `${index * 150}ms` : '0ms' 
              }}
            >
              <CardContent className="p-6">
                <stat.icon className="w-8 h-8 text-accent mx-auto mb-3 group-hover:animate-glow-pulse" />
                <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Featured Achievements */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-center mb-8 text-foreground">Featured Achievements</h3>
          <div className="grid md:grid-cols-2 gap-8">
            {achievements.filter(achievement => achievement.featured).map((achievement, index) => (
              <Card 
                key={index} 
                className={`cyber-card group hover:scale-105 ring-2 ring-accent/50 transition-all duration-1000 ${
                  isVisible 
                    ? 'opacity-100 translate-x-0 rotate-0' 
                    : 'opacity-0 -translate-x-8 -rotate-2'
                }`}
                style={{ 
                  transitionDelay: isVisible ? `${index * 300 + 600}ms` : '0ms' 
                }}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <achievement.icon className={`w-10 h-10 ${achievement.color} group-hover:animate-glow-pulse`} />
                      <div>
                        <CardTitle className="text-xl font-bold text-foreground group-hover:text-accent transition-colors">
                          {achievement.title}
                        </CardTitle>
                        <div className="flex items-center space-x-2 mt-2">
                          <Badge variant="outline" className="text-xs border-accent/50 text-accent">
                            {achievement.category}
                          </Badge>
                          <span className="text-sm text-muted-foreground">{achievement.date}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {achievement.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* All Achievements */}
        <div>
          <h3 className="text-2xl font-bold text-center mb-8 text-foreground">Additional Recognition</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {achievements.filter(achievement => !achievement.featured).map((achievement, index) => (
              <Card 
                key={index} 
                className={`cyber-card group hover:scale-105 transition-all duration-800 ${
                  isVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-4'
                }`}
                style={{ 
                  transitionDelay: isVisible ? `${index * 200 + 1200}ms` : '0ms' 
                }}
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <achievement.icon className={`w-8 h-8 ${achievement.color} mt-1 group-hover:animate-glow-pulse`} />
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">
                        {achievement.title}
                      </h4>
                      <div className="flex items-center space-x-2 mb-3">
                        <Badge variant="secondary" className="text-xs bg-muted/30 text-muted-foreground">
                          {achievement.category}
                        </Badge>
                        <span className="text-sm text-muted-foreground">{achievement.date}</span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className={`text-center mt-16 transition-all duration-1000 delay-[1600ms] ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
          <Card className="cyber-card max-w-2xl mx-auto">
            <CardContent className="p-8">
              <Trophy className="w-12 h-12 text-accent mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Ready for New Challenges
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                These achievements represent my commitment to excellence and continuous growth. 
                I'm always eager to take on new challenges and contribute to innovative projects 
                in cybersecurity and technology.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Achievements;