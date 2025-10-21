import React from 'react';
import Link from 'next/link';
import { FeaturedPages } from '@/lib';
import { Button, Container } from '@/components/ui';
import { IconChevronRight } from '@tabler/icons-react';

type HomeHeroProps = {
  featuredPages: FeaturedPages[];
};

export function HomeHero({ featuredPages }: HomeHeroProps) {
  return (
    <Container asChild className='gradient-border-b'>
      <section
        id='home-hero'
        className=' grid grid-cols-1 md:grid-cols-2 gap-8 min-h-[80vh]'
      >
        <div className='self-center text-center md:text-left py-10'>
          <h3 className='text-5xl lg:text-7xl font-black mb-2'>RESTBRASIL</h3>
          <p className='text-pretty max-w-2xl text-lg text-muted-foreground mb-8'>
            Encontre diversas páginas úteis em um só lugar através de uma
            interface moderna para sua comodidade.
          </p>

          <Button size='lg' asChild>
            <Link
              href='#display'
              aria-label='Ir para sessão com alguns exemplos de páginas'
              className='mr-4 hover:scale-105 [&_svg]:transition hover:[&_svg]:rotate-90'
            >
              Explorar
              <span aria-hidden>
                <IconChevronRight />
              </span>
            </Link>
          </Button>

          <Button size='lg' variant='outline' asChild>
            <Link
              href='/sobre'
              aria-label='Ir para página sobre os objetivos do site'
              className='hover:scale-105'
            >
              Sobre
            </Link>
          </Button>
        </div>

        <div className='self-center py-4'>
          <div className='grid grid-cols-2 gap-y-10 items-center justify-items-center'>
            {featuredPages.map((item, idx) => (
              <React.Fragment key={item.name}>
                {React.isValidElement(item.icon)
                  ? React.cloneElement(item.icon, {
                      className: `${item.icon.props.className} size-20 md:size-25 lg:size-30 transition hover:rotate-6 hover:scale-115 drop-shadow-[0_0_40px_currentColor] animate-float-${idx}`,
                    })
                  : null}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>
    </Container>
  );
}

// import React from 'react';
// import Link from 'next/link';
// import { FeaturedPages } from '@/lib';
// import { Button, Container } from '@/components/ui';
// import { IconChevronRight } from '@tabler/icons-react';

// type HomeHeroProps = {
//   featuredPages: FeaturedPages[];
// };

// export function HomeHero({ featuredPages }: HomeHeroProps) {
//   return (
//     <section id='home-hero' className='gradient-border-b'>
//       <Container className='grid grid-cols-1 md:grid-cols-2 gap-8 min-h-[80vh]'>
//         <div className='self-center text-center md:text-left py-10'>
//           <h3 className='text-5xl lg:text-7xl font-black mb-2'>RESTBRASIL</h3>
//           <p className='text-pretty max-w-2xl text-lg text-muted-foreground mb-8'>
//             Encontre diversas páginas úteis em um só lugar através de uma
//             interface moderna para sua comodidade.
//           </p>

//           <Button size='lg' asChild>
//             <Link
//               href='#display'
//               aria-label='Ir para sessão com alguns exemplos de páginas'
//               className='mr-4 hover:scale-105 [&_svg]:transition hover:[&_svg]:rotate-90'
//             >
//               Explorar
//               <span aria-hidden>
//                 <IconChevronRight />
//               </span>
//             </Link>
//           </Button>

//           <Button size='lg' variant='outline' asChild>
//             <Link
//               href='/sobre'
//               aria-label='Ir para página sobre os objetivos do site'
//               className='hover:scale-105'
//             >
//               Sobre
//             </Link>
//           </Button>
//         </div>

//         <div className='self-center py-4'>
//           <div className='grid grid-cols-2 gap-y-10 items-center justify-items-center'>
//             {featuredPages.map((item, idx) => (
//               <React.Fragment key={item.name}>
//                 {React.isValidElement(item.icon)
//                   ? React.cloneElement(item.icon, {
//                       className: `${item.icon.props.className} size-20 md:size-25 lg:size-30 transition hover:rotate-6 hover:scale-115 drop-shadow-[0_0_40px_currentColor] animate-float-${idx}`,
//                     })
//                   : null}
//               </React.Fragment>
//             ))}
//           </div>
//         </div>
//       </Container>
//     </section>
//   );
// }
