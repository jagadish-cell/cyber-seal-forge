import { Trophy, Medal, Star, Users, Calendar, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Achievements = () => {
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
      category: "Academic",
      color: "text-blue-400",
      featured: true
    },
    {
      icon: Star,
      title: "Outstanding Academic Performance",
      description: "Maintained excellent academic standing throughout the B.Tech program with consistent high grades in cybersecurity and computer science courses.",
      date: "2021-2024",
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
    <section id="achievements" className="py-20 bg-gradient-dark">
      <div className="section-container">
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
            <Card key={index} className="cyber-card text-center group hover:scale-105">
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
              <Card key={index} className="cyber-card group hover:scale-105 ring-2 ring-accent/50">
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
              <Card key={index} className="cyber-card group hover:scale-105">
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
        <div className="text-center mt-16">
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