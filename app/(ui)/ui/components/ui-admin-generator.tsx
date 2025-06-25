import { LabeledSection } from "./ui-section";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Code, Zap, Type, RefreshCw } from 'lucide-react';

export function UiAdminGeneratorSample() {
  return (
    <div className="space-y-8">
      <LabeledSection label="Générateur d'Interface Admin Ultra-Simplifié">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Présentation */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Système Ultra-Simplifié
              </CardTitle>
              <CardDescription>
                Générez des interfaces CRUD complètes à partir de schémas Zod enrichis
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-medium">Fonctionnalités clés :</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Génération automatique de tables et formulaires</li>
                  <li>• Validation Zod intégrée</li>
                  <li>• Services CRUD configurables (Mock/API)</li>
                  <li>• Type-safety complète TypeScript</li>
                  <li>• Intégration design system</li>
                </ul>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">TypeScript</Badge>
                <Badge variant="secondary">Zod</Badge>
                <Badge variant="secondary">React</Badge>
                <Badge variant="secondary">TanStack</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Code Example */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5" />
                Exemple Ultra-Simple
              </CardTitle>
              <CardDescription>
                3 lignes de code pour une interface complète
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-4 rounded-lg font-mono text-sm">
                <div className="text-green-600">{`// 1. Schéma enrichi`}</div>
                <div>const schema = z.object({`{`}</div>
                <div className="ml-2">name: createField.string({`{`}</div>
                <div className="ml-4">label: &apos;Nom&apos;,</div>
                <div className="ml-4">placeholder: &apos;Entrez le nom&apos;</div>
                <div className="ml-2">{`}`}),</div>
                <div>{`}`});</div>
                <br/>
                <div className="text-green-600">{`// 2. Config avec service`}</div>
                <div>const config = createAdminEntity(</div>
                <div className="ml-2">&apos;Product&apos;, schema, {`{`}</div>
                <div className="ml-4">services: createMockService(data)</div>
                <div className="ml-2">{`}`}</div>
                <div>);</div>
                <br/>
                <div className="text-green-600">{`// 3. Interface complète`}</div>
                <div>&lt;AdminPage config={`{config}`} schema={`{schema}`} /&gt;</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </LabeledSection>

      <LabeledSection label="Types de Champs Supportés">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Type className="h-4 w-4" />
                Types de Base
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <ul className="text-sm space-y-1">
                <li><code>createField.string()</code> → Input text</li>
                <li><code>createField.number()</code> → Input number</li>
                <li><code>createField.boolean()</code> → Checkbox</li>
                <li><code>createField.date()</code> → Date picker</li>
                <li><code>createField.select()</code> → Select dropdown</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Type className="h-4 w-4" />
                Types Avancés
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <ul className="text-sm space-y-1">
                <li><code>createField.email()</code> → Input email</li>
                <li><code>createField.textarea()</code> → Textarea</li>
                <li><code>createField.image()</code> → Upload image</li>
                <li><code>createField.relation()</code> → Relation</li>
                <li><code>createField.richText()</code> → Éditeur riche</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <RefreshCw className="h-4 w-4" />
                Services CRUD
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <ul className="text-sm space-y-1">
                <li><code>createMockService()</code> → Données test</li>
                <li><code>createApiService()</code> → API REST</li>
                <li>Intégration <code>BaseService</code></li>
                <li>Auto-génération des types</li>
                <li>Gestion d&apos;erreurs centralisée</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </LabeledSection>

      <LabeledSection label="Démo Live - Catégories">
        <Card>
          <CardHeader>
            <CardTitle>Interface Générée Automatiquement</CardTitle>
            <CardDescription>
              Cette interface a été générée à partir du schéma Zod suivant :
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-muted p-4 rounded-lg font-mono text-sm mb-4">
              <div>const CategorySchema = z.object({`{`}</div>
              <div className="ml-2">name: createField.string({`{`} label: &apos;Nom de la catégorie&apos; {`}`}),</div>
              <div className="ml-2">createdAt: createField.date({`{`} label: &apos;Créé le&apos; {`}`}).optional(),</div>
              <div className="ml-2">updatedAt: createField.date({`{`} label: &apos;Modifié le&apos; {`}`}).optional(),</div>
              <div>{`}`});</div>
            </div>
            
            <div className="flex justify-center">
              <Button asChild>
                <a href="/categories" target="_blank">
                  Voir la Démo Live →
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </LabeledSection>
    </div>
  );
}
