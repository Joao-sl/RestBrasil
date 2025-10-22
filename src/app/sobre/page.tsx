import clsx from 'clsx';
import Link from 'next/link';
import { Metadata } from 'next';
import { Button, Container } from '@/components/ui';
import {
  IconApi,
  IconArrowNarrowLeft,
  IconChartPie,
  IconTable,
} from '@tabler/icons-react';

export const metadata: Metadata = {
  title: 'Sobre',
  description: 'Sobre os objetivos da RestBrasil',
};

const linkClasses = 'text-primary hover:underline';
const h2Classes = 'text-3xl font-bold tracking-tight';
const iconClasses = clsx(
  'flex items-center justify-center shrink-0 size-12 border',
  'rounded-xl bg-card dark:bg-accent shadow-sm [&_svg]:size-6.5',
);

const heroIcons = [
  {
    value: 'APIs',
    icon: <IconApi size={40} className='text-green-500' />,
  },
  {
    value: 'Frontend',
    icon: <IconTable size={30} className='text-blue-500' />,
  },
  {
    value: 'Dashboards',
    icon: <IconChartPie size={30} className='text-purple-500' />,
  },
];

export default function Sobre() {
  return (
    <Container asChild>
      <article>
        <h1 className='mb-6 text-center font-bold text-5xl md:text-6xl'>
          Sobre
        </h1>

        <section className='mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:gap-16 items-center border-y py-18'>
          <div className='self-center space-y-3'>
            <h2 className='text-balance text-4xl font-bold tracking-tight md:text-5xl'>
              Objetivo
            </h2>
            <p className='text-pretty text-lg leading-relaxed text-muted-foreground'>
              Existem diversas{' '}
              <Link href='#API' className={linkClasses}>
                APIs
              </Link>{' '}
              úteis espalhadas pela internet. Nosso objetivo é unificar varias
              delas, construindo um{' '}
              <Link href='#frontend' className={linkClasses}>
                frontend
              </Link>{' '}
              para cada uma em um só lugar, exibindo os dados em{' '}
              <Link href='#dashboard' className={linkClasses}>
                dashboards
              </Link>{' '}
              de fácil compreensão e navegação.
            </p>
          </div>

          <div
            aria-hidden='true'
            className={clsx(
              'aspect-square p-8 border rounded-2xl',
              'bg-gradient-to-br from-green-500/10 via-background to-blue-500/10',
            )}
          >
            <div className='flex h-full flex-col items-center justify-center gap-8'>
              <div className='grid grid-cols-2 gap-4 w-full'>
                {heroIcons.map(item => {
                  return (
                    <div
                      key={item.value}
                      className='flex items-center gap-4 rounded-xl border bg-card p-6 shadow-sm last:col-span-2'
                    >
                      {item.icon}
                      <p className='font-semibold'>{item.value}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <div className='mx-auto max-w-4xl space-y-20 py-18 border-b'>
          <section className='flex gap-4 border-b pb-18'>
            <div aria-hidden='true' className={iconClasses}>
              <IconApi className='text-green-500' />
            </div>

            <div className='space-y-3'>
              <h2 id='API' className={h2Classes}>
                O que é uma API
              </h2>

              <div className='text-muted-foreground space-y-5'>
                <div className='space-y-2'>
                  <p>
                    API é a sigla para Application Programming Interface, em
                    português Interface de Programação de Aplicações. Mas isso é
                    só o nome técnico o importante é entender o papel que ela
                    cumpre.
                  </p>

                  <p>Uma API é como uma ponte entre dois sistemas.</p>
                  <p>
                    Ela permite que diferentes programas “conversem” entre si e
                    troquem informações, de forma segura e padronizada,
                    geralmente retornando dados em formato JSON, que é uma
                    estrutura de dados muito leve.
                  </p>

                  <p>Vamos usar de exemplo a página de clima do nosso site.</p>
                  <p>
                    Você quer saber as condições meteorológicas da sua cidade em
                    específico.
                  </p>
                </div>

                <div className='space-y-1'>
                  <h3 className='font-semibold text-foreground text-lg'>
                    Como funciona?
                  </h3>
                  <ol className='space-y-2'>
                    <li>
                      Você informa ao nosso site qual cidade você tem interesse
                      em saber o clima.
                    </li>
                    <li>
                      O nosso site faz uma requisição (um pedido) para um
                      endereço específico (endpoint) com as informações
                      (parâmetros), nesse caso é o nome da cidade.
                    </li>
                    <li>
                      A outra parte processa o pedido fazendo as verificações
                      necessárias, se estiver tudo em ordem, ela devolve uma
                      resposta.
                    </li>
                    <li>
                      Com essa resposta, o nosso site ou aplicativo consegue
                      preencher o dashboard com as informações retornadas pela
                      API e exibi-lo para você.
                    </li>
                  </ol>
                </div>

                <div className='space-y-1'>
                  <h3 className='font-semibold text-foreground text-lg'>
                    Quais as vantagens?
                  </h3>

                  <ul className='list-disc list-inside'>
                    <li>Tornam os aplicativos mais rápidos e eficientes.</li>
                    <li>Permitem que diferentes plataformas se conectem.</li>
                    <li>
                      Garantem que a troca de dados seja segura e confiável.
                    </li>
                    <li>
                      Separa responsabilidades (quem fornece dados não precisa
                      saber como você usa).
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className='flex gap-4 border-b pb-18'>
            <div aria-hidden='true' className={iconClasses}>
              <IconTable className='text-blue-500' />
            </div>

            <div className='space-y-3'>
              <h2 id='frontend' className={h2Classes}>
                O que é o frontend
              </h2>

              <div className='space-y-2 text-muted-foreground'>
                <p>
                  O frontend é a “parte da frente” de um sistema, ou seja, a
                  interface que você vê e usa: botões, menus, imagens, textos,
                  formulários etc.
                </p>
                <p>
                  É o que você toca, clica e lê. Mas o frontend, sozinho, não
                  armazena dados, não faz cálculos importantes, nem busca
                  informações externas. Ele só mostra e organiza o conteúdo para
                  o usuário.
                </p>

                <p>
                  É por meio do frontend que você interage com o sistema por
                  trás (backend). O backend é responsável por toda a lógica por
                  trás dessa interface. O frontend é projetado para ser
                  interativo e fácil de usar, evitando que você precise lidar
                  diretamente com o sistema por meio de linhas de código, por
                  exemplo.
                </p>
              </div>
            </div>
          </section>

          <section className='flex gap-4'>
            <div aria-hidden='true' className={iconClasses}>
              <IconChartPie className='text-purple-500' />
            </div>

            <div className='space-y-3'>
              <h2 id='dashboard' className={h2Classes}>
                O que é um dashboard
              </h2>
              <p className='text-muted-foreground'>
                Um dashboard (em português, painel de controle) é uma tela que
                reúne informações importantes de forma visual e organizada, como
                gráficos, números, tabelas e indicadores.
              </p>
            </div>
          </section>
        </div>

        <div className='flex flex-col justify-center items-center py-18'>
          <h3 className='text-4xl font-bold text-center mb-2'>Tudo certo?</h3>
          <p className='text-muted-foreground text-center text-lg mb-8'>
            Agora explore e descubra como nossas ferramentas podem te ajudar.
          </p>

          <Button size='lg' asChild>
            <Link
              href='/'
              className='[&_svg]:transition hover:[&_svg]:-translate-x-1 hover:scale-105'
            >
              <IconArrowNarrowLeft strokeWidth={2.5} />
              Voltar ao Inicio
            </Link>
          </Button>
        </div>
      </article>
    </Container>
  );
}
