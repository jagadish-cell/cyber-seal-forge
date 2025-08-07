import { Heart, Github, Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: Github,
      href: "https://github.com/jagadish-cell",
      label: "GitHub"
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/bandi-naga-jagadish-8908a024a/",
      label: "LinkedIn"
    },
    {
      icon: Mail,
      href: "mailto:jdjagadish143@gmail.com",
      label: "Email"
    }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gradient-dark border-t border-border/50">
      <div className="section-container py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-glow">
              Bandi Naga Jagadish<span className="text-accent">.</span>
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Cybersecurity Professional & Full Stack Developer passionate about creating 
              secure, innovative solutions in the digital world.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground">Quick Links</h4>
            <div className="grid grid-cols-2 gap-2">
              {[
                { name: 'About', href: '#about' },
                { name: 'Skills', href: '#skills' },
                { name: 'Projects', href: '#projects' },
                { name: 'Contact', href: '#contact' }
              ].map((link) => (
                <button
                  key={link.name}
                  onClick={() => {
                    const element = document.querySelector(link.href);
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="text-muted-foreground hover:text-accent text-left transition-colors"
                >
                  {link.name}
                </button>
              ))}
            </div>
          </div>

          {/* Connect */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground">Connect</h4>
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <Button
                  key={social.label}
                  variant="outline"
                  size="sm"
                  className="border-accent/50 text-accent hover:bg-accent/20"
                  onClick={() => window.open(social.href, '_blank')}
                >
                  <social.icon className="w-4 h-4" />
                  <span className="sr-only">{social.label}</span>
                </Button>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              Open to cybersecurity consulting, development projects, and innovative collaborations.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border/50 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <span>© {currentYear} Built by Bandi Naga Jagadish</span>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={scrollToTop}
            className="text-muted-foreground hover:text-accent mt-4 md:mt-0"
          >
            Back to Top ↑
          </Button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;