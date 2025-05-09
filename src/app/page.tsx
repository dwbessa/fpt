import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, BookOpenText, Gamepad2 } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <>
      <PageHeader title="Dashboard" />
      <main className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Bem-vindo(a) de volta!</CardTitle>
            <CardDescription>Continue sua jornada de aprendizado e prepare-se para o sucesso.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Aqui você encontra um resumo do seu progresso e acesso rápido às principais seções.</p>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Progresso Geral</CardTitle>
              <CardDescription>Sua evolução nas trilhas de estudo.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span>Português</span>
                    <span className="text-sm text-muted-foreground">75%</span>
                  </div>
                  <Progress value={75} aria-label="Progresso em Português: 75%" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span>Matemática</span>
                    <span className="text-sm text-muted-foreground">50%</span>
                  </div>
                  <Progress value={50} aria-label="Progresso em Matemática: 50%" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span>História</span>
                    <span className="text-sm text-muted-foreground">20%</span>
                  </div>
                  <Progress value={20} aria-label="Progresso em História: 20%" />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" asChild className="w-full">
                <Link href="/subject-trails">Ver todas as trilhas <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </CardFooter>
          </Card>

          <Card className="shadow-md">
            <CardHeader>
              <BookOpenText className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Trilhas de Estudo</CardTitle>
              <CardDescription>Acesse os conteúdos e siga seu plano de aprendizado.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Explore as matérias disponíveis e avance no seu ritmo.</p>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full bg-primary hover:bg-primary/90">
                <Link href="/subject-trails">Começar a aprender <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </CardFooter>
          </Card>

          <Card className="shadow-md">
            <CardHeader>
              <Gamepad2 className="h-10 w-10 text-accent mb-2" />
              <CardTitle>Zona de Prática</CardTitle>
              <CardDescription>Teste seus conhecimentos com exercícios e simulados.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Desafie-se e identifique áreas para melhorar.</p>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link href="/practice-zone">Testar conhecimentos <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </>
  );
}
