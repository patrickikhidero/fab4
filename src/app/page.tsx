// import Link from 'next/link'
// import { Button } from '@/components/ui'

// export default function HomePage() {
//   return (
//     <div className="min-h-screen bg-background">
//       <div className="container mx-auto px-4 py-16">
//         <div className="text-center space-y-8">
//           <h1 className="text-6xl font-bold tracking-tight">
//             FabFour Foundation
//           </h1>
//           <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
//             Empowering students through education and support. Connect with donors, 
//             counselors, and resources to achieve your academic goals.
//           </p>
          
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <Link href="/student">
//               <Button size="lg" className="w-full sm:w-auto">
//                 Student Portal
//               </Button>
//             </Link>
//             <Link href="/donor">
//               <Button variant="outline" size="lg" className="w-full sm:w-auto">
//                 Donor Portal
//               </Button>
//             </Link>
//             <Link href="/counselor">
//               <Button variant="secondary" size="lg" className="w-full sm:w-auto">
//                 Counselor Portal
//               </Button>
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

import { redirect } from "next/navigation";

export default function Home() {
  redirect("/login");
}
