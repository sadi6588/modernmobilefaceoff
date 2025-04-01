
import React from "react";
import { Phone } from "@/data/phonesData";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowRightLeft, Check } from "lucide-react";

interface ComparisonTableProps {
  phone1?: Phone;
  phone2?: Phone;
}

const ComparisonTable: React.FC<ComparisonTableProps> = ({ phone1, phone2 }) => {
  if (!phone1 || !phone2) {
    return (
      <div className="glass p-8 text-center">
        <p className="text-xl text-neutral-300">
          Select two phones to compare their specifications
        </p>
      </div>
    );
  }
  
  const specs = Object.keys(phone1.specs) as Array<keyof typeof phone1.specs>;
  
  return (
    <div className="w-full overflow-x-auto glass">
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 p-4">
        <div className="text-center">
          <img src={phone1.image} alt={phone1.name} className="h-32 object-contain" />
          <h3 className="text-xl font-medium mt-2">{phone1.name}</h3>
        </div>
        
        <div className="versus">VS</div>
        
        <div className="text-center">
          <img src={phone2.image} alt={phone2.name} className="h-32 object-contain" />
          <h3 className="text-xl font-medium mt-2">{phone2.name}</h3>
        </div>
      </div>
      
      <Table>
        <TableHeader>
          <TableRow className="border-b border-white/10">
            <TableHead className="min-w-[120px]">Specification</TableHead>
            <TableHead className="min-w-[160px] text-center">{phone1.name}</TableHead>
            <TableHead className="w-[60px] text-center"><ArrowRightLeft className="h-5 w-5 mx-auto text-neutral-400" /></TableHead>
            <TableHead className="min-w-[160px] text-center">{phone2.name}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {specs.map((specKey) => {
            const spec1 = phone1.specs[specKey];
            const spec2 = phone2.specs[specKey];
            
            return (
              <TableRow key={specKey} className="border-b border-white/5">
                <TableCell className="font-medium text-neutral-300">
                  {spec1.name}
                </TableCell>
                <TableCell className={`text-center ${spec1.winner ? "neon-text" : ""}`}>
                  {spec1.value.toString()}
                  {spec1.winner && <Check className="h-4 w-4 inline ml-1 text-green-500" />}
                </TableCell>
                <TableCell className="text-center text-neutral-500">{" "}</TableCell>
                <TableCell className={`text-center ${spec2.winner ? "neon-text" : ""}`}>
                  {spec2.value.toString()}
                  {spec2.winner && <Check className="h-4 w-4 inline ml-1 text-green-500" />}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default ComparisonTable;
