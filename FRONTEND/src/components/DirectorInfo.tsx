import { Mail, Phone, Award } from "lucide-react";

export const DirectorInfo = () => {
  return (
    <div className="bg-gradient-hero text-primary-foreground py-6 rounded-xl shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-around gap-4 text-center md:text-left">
          <div className="flex items-center gap-3">
            <Award className="h-6 w-6 text-accent" />
            <div>
              <p className="text-sm font-medium opacity-90">Physical Director</p>
              <p className="font-bold text-lg">Dr. Rajesh Kumar</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Phone className="h-6 w-6 text-accent" />
            <div>
              <p className="text-sm font-medium opacity-90">Contact</p>
              <p className="font-bold text-lg">+91 98765 43210</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Mail className="h-6 w-6 text-accent" />
            <div>
              <p className="text-sm font-medium opacity-90">Email</p>
              <p className="font-bold text-lg">sports@college.edu</p>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-4">
          <p className="text-sm italic opacity-90">
            "Dedicated to Nurturing Sports Excellence"
          </p>
        </div>
      </div>
    </div>
  );
};
