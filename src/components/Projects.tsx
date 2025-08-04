import { ExternalLink, Github, Shield, Vote } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Projects = () => {
  const projects = [
    {
      icon: Vote,
      title: "Online Voting System Using Blockchain",
      description: "A secure, transparent voting platform built with React.js frontend and Node.js backend, utilizing blockchain technology to ensure immutable and verifiable voting records.",
      technologies: ["React.js", "Node.js", "Blockchain", "Smart Contracts", "Web3", "MongoDB"],
      role: "Full Stack Developer",
      liveUrl: "https://online-voting-system-nu-ten.vercel.app/",
      githubUrl: "#",
      highlights: [
        "Immutable voting records using blockchain",
        "Real-time vote counting and results",
        "Secure voter authentication system",
        "Transparent and auditable election process"
      ]
    },
    {
      icon: Shield,
      title: "Social Engineering Simulation (Storm-Breaker + Ngrok)",
      description: "An educational cybersecurity tool for simulating phishing attacks and social engineering techniques, designed to raise awareness about cybersecurity threats and vulnerabilities.",
      technologies: ["Python", "Ngrok", "Social Engineering", "Penetration Testing", "Linux", "Networking"],
      role: "Cybersecurity Researcher",
      liveUrl: "#",
      githubUrl: "#",
      highlights: [
        "Simulated phishing attack scenarios",
        "Secure tunneling with Ngrok",
        "Educational cybersecurity awareness",
        "Ethical hacking research and analysis"
      ]
    }
  ];

  return (
    <section id="projects" className="py-20 bg-gradient-dark">
      <div className="section-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-glow">
            Featured <span className="text-accent">Projects</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Innovative solutions combining cybersecurity expertise with modern development practices
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Card key={index} className="cyber-card group hover:scale-105">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <project.icon className="w-8 h-8 text-accent group-hover:animate-glow-pulse" />
                    <div>
                      <CardTitle className="text-xl font-bold text-foreground group-hover:text-accent transition-colors">
                        {project.title}
                      </CardTitle>
                      <CardDescription className="text-muted-foreground mt-1">
                        {project.role}
                      </CardDescription>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <p className="text-muted-foreground leading-relaxed">
                  {project.description}
                </p>

                {/* Key Highlights */}
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-3">Key Features:</h4>
                  <ul className="space-y-2">
                    {project.highlights.map((highlight, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-start">
                        <span className="w-1.5 h-1.5 bg-accent rounded-full mt-2 mr-3 flex-shrink-0" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technologies */}
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-3">Technologies Used:</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, idx) => (
                      <Badge 
                        key={idx} 
                        variant="outline" 
                        className="text-xs border-accent/50 text-accent hover:bg-accent/20"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3 pt-4">
                  {project.liveUrl !== "#" && (
                    <Button 
                      variant="default" 
                      size="sm" 
                      className="bg-accent text-accent-foreground hover:bg-accent/90"
                      onClick={() => window.open(project.liveUrl, '_blank')}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Live Demo
                    </Button>
                  )}
                  
                  {project.githubUrl !== "#" && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="border-accent/50 text-accent hover:bg-accent/20"
                      onClick={() => window.open(project.githubUrl, '_blank')}
                    >
                      <Github className="w-4 h-4 mr-2" />
                      Source Code
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-6">
            Want to see more of my work or collaborate on a project?
          </p>
          <Button 
            variant="outline" 
            className="border-accent text-accent hover:bg-accent hover:text-accent-foreground"
            onClick={() => window.open('https://github.com/jagadish-cell', '_blank')}
          >
            <Github className="w-5 h-5 mr-2" />
            Visit My GitHub
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Projects;