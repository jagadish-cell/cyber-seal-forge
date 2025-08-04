import { useState } from 'react';
import { Mail, Phone, MapPin, Github, Linkedin, Globe, Send } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const { toast } = useToast();

  const contactInfo = [
    {
      icon: Phone,
      label: "Phone",
      value: "6303226279",
      href: "tel:6303226279",
      color: "text-green-400"
    },
    {
      icon: Mail,
      label: "Email",
      value: "jdjagadish143@gmail.com",
      href: "mailto:jdjagadish143@gmail.com",
      color: "text-blue-400"
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Andhra Pradesh, India",
      href: "#",
      color: "text-red-400"
    }
  ];

  const socialLinks = [
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/bandi-naga-jagadish-8908a024a/",
      color: "text-blue-500"
    },
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com/jagadish-cell",
      color: "text-purple-400"
    },
    {
      icon: Globe,
      label: "Portfolio",
      href: "https://portfolio-tau-nine-4a80on40in.vercel.app/",
      color: "text-accent"
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    // Simulate form submission
    toast({
      title: "Message Sent!",
      description: "Thank you for your message. I'll get back to you soon!",
    });

    // Reset form
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="py-20">
      <div className="section-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-glow">
            Get In <span className="text-accent">Touch</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Let's connect and discuss opportunities in cybersecurity, development, or potential collaborations
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6">Contact Information</h3>
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <Card key={index} className="cyber-card group hover:scale-105">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-4">
                        <info.icon className={`w-6 h-6 ${info.color} group-hover:animate-glow-pulse`} />
                        <div>
                          <p className="text-sm text-muted-foreground">{info.label}</p>
                          {info.href !== "#" ? (
                            <a 
                              href={info.href}
                              className="text-foreground hover:text-accent transition-colors font-medium"
                            >
                              {info.value}
                            </a>
                          ) : (
                            <p className="text-foreground font-medium">{info.value}</p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6">Connect With Me</h3>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="lg"
                    className="flex-1 border-accent/50 text-accent hover:bg-accent/20 group"
                    onClick={() => window.open(social.href, '_blank')}
                  >
                    <social.icon className={`w-5 h-5 mr-2 ${social.color} group-hover:animate-glow-pulse`} />
                    {social.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Quick Message */}
            <Card className="cyber-card">
              <CardContent className="p-6">
                <h4 className="text-lg font-semibold text-foreground mb-3">Available for:</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-accent rounded-full mt-2 mr-3 flex-shrink-0" />
                    Cybersecurity consulting and penetration testing
                  </li>
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-accent rounded-full mt-2 mr-3 flex-shrink-0" />
                    Full-stack web development projects
                  </li>
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-accent rounded-full mt-2 mr-3 flex-shrink-0" />
                    Blockchain and smart contract development
                  </li>
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-accent rounded-full mt-2 mr-3 flex-shrink-0" />
                    Collaboration on innovative tech projects
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div>
            <Card className="cyber-card">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-foreground">Send a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-foreground">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="bg-muted/20 border-border focus:border-accent"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-foreground">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="bg-muted/20 border-border focus:border-accent"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-foreground">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell me about your project or inquiry..."
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="bg-muted/20 border-border focus:border-accent resize-none"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full btn-hero group"
                    size="lg"
                  >
                    <Send className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;