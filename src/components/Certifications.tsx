import { Award, ExternalLink, Shield, Code, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import ccCertImage from '@/assets/cc-certification.png';
import webDevCertImage from '@/assets/web-dev-certification.png';

const Certifications = () => {
  const certifications = [
    {
      icon: Shield,
      title: "Certified in Cyber Security (CC)",
      issuer: "ISC2",
      date: "2024",
      description: "Comprehensive cybersecurity certification covering security principles, risk management, and incident response.",
      skills: ["Risk Management", "Security Controls", "Incident Response", "Access Control"],
      verifyUrl: "#",
      featured: true,
      image: ccCertImage
    },
    {
      icon: Code,
      title: "Web Development Certification",
      issuer: "Udemy",
      date: "2023",
      description: "Full-stack web development certification covering modern frameworks and best practices.",
      skills: ["React.js", "Node.js", "Database Design", "API Development"],
      verifyUrl: "#",
      featured: false,
      image: webDevCertImage
    }
  ];

  return (
    <section id="certifications" className="py-20">
      <div className="section-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-glow">
            Certifications & <span className="text-accent">Training</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Professional certifications and specialized training programs that validate my expertise
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {certifications.map((cert, index) => (
            <Card 
              key={index} 
              className={`cyber-card group hover:scale-105 ${
                cert.featured ? 'ring-2 ring-accent/50' : ''
              }`}
            >
              <CardHeader className="text-center pb-4">
                {/* Certification Image */}
                <div className="mb-4 overflow-hidden rounded-lg">
                  <img 
                    src={cert.image} 
                    alt={cert.title}
                    className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                <div className="flex justify-center mb-4">
                  <div className={`p-3 rounded-full ${
                    cert.featured ? 'bg-accent/20' : 'bg-muted/20'
                  }`}>
                    <cert.icon className={`w-8 h-8 ${
                      cert.featured ? 'text-accent' : 'text-muted-foreground'
                    } group-hover:animate-glow-pulse`} />
                  </div>
                </div>
                
                <CardTitle className="text-lg font-bold text-foreground mb-2">
                  {cert.title}
                </CardTitle>
                
                <div className="flex flex-col items-center space-y-1">
                  <Badge variant="outline" className="text-xs border-accent/50 text-accent">
                    {cert.issuer}
                  </Badge>
                  <span className="text-sm text-muted-foreground">{cert.date}</span>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {cert.description}
                </p>

                {/* Skills Covered */}
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-2">Skills Covered:</h4>
                  <div className="flex flex-wrap gap-1">
                    {cert.skills.map((skill, idx) => (
                      <Badge 
                        key={idx} 
                        variant="secondary"
                        className="text-xs bg-muted/30 text-muted-foreground"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Verify Button */}
                {cert.verifyUrl !== "#" && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full border-accent/50 text-accent hover:bg-accent/20"
                    onClick={() => window.open(cert.verifyUrl, '_blank')}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Verify Certificate
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Continuing Education */}
        <div className="mt-16 text-center">
          <Card className="cyber-card max-w-4xl mx-auto">
            <CardContent className="p-8">
              <Award className="w-12 h-12 text-accent mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Committed to Continuous Learning
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                The cybersecurity landscape is constantly evolving, and I'm committed to staying at the 
                forefront of industry developments. I regularly participate in workshops, online courses, 
                and professional development programs to enhance my skills and knowledge.
              </p>
              <div className="grid md:grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-accent">2+</div>
                  <div className="text-sm text-muted-foreground">Professional Certifications</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-accent">50+</div>
                  <div className="text-sm text-muted-foreground">Hours of Training</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-accent">2024</div>
                  <div className="text-sm text-muted-foreground">Latest Certification</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Certifications;