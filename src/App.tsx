import React from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ThemeProvider } from './context/ThemeContext';
import { GlobalStyles } from './styles/GlobalStyles';
import { queryClient } from './lib/react-query';
import { Button } from './components/common/Button';
import { Input } from './components/common/Input';
import { Moon, Sun, Search, Plus } from 'lucide-react';
import { useTheme } from './context/ThemeContext';

function AppContent() {
    const { theme, toggleTheme } = useTheme();

    return (
        <>
            <GlobalStyles />
            <div className="container" style={{ padding: '2rem 1rem', maxWidth: '1200px', margin: '0 auto' }}>
                <header style={{ marginBottom: '3rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <h1>🎯 Kairos</h1>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={toggleTheme}
                            leftIcon={theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
                        >
                            {theme === 'light' ? 'Oscuro' : 'Claro'}
                        </Button>
                    </div>
                    <p style={{ fontSize: '1.125rem', opacity: 0.8 }}>
                        Tu sistema de productividad personal
                    </p>
                </header>

                <main>
                    <section style={{ marginBottom: '3rem' }}>
                        <h2>Bievenido a Kairos</h2>
                        <p>
                            La estructura del proyecto ha sido creada exitosamente con todas las dependencias instaladas.
                        </p>
                    </section>

                    <section style={{ marginBottom: '3rem' }}>
                        <h3 style={{ marginBottom: '1.5rem' }}>Componentes de Ejemplo</h3>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            {/* Buttons */}
                            <div>
                                <h4 style={{ marginBottom: '1rem' }}>Botones</h4>
                                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                    <Button variant="primary">Primary</Button>
                                    <Button variant="secondary">Secondary</Button>
                                    <Button variant="outline">Outline</Button>
                                    <Button variant="ghost">Ghost</Button>
                                    <Button variant="danger">Danger</Button>
                                    <Button variant="primary" isLoading>Loading</Button>
                                    <Button variant="primary" leftIcon={<Plus size={16} />}>
                                        Nueva Tarea
                                    </Button>
                                </div>
                            </div>

                            {/* Inputs */}
                            <div>
                                <h4 style={{ marginBottom: '1rem' }}>Inputs</h4>
                                <div style={{ display: 'grid', gap: '1rem', maxWidth: '400px' }}>
                                    <Input
                                        label="Nombre de tarea"
                                        placeholder="Escribe el nombre de la tarea..."
                                    />
                                    <Input
                                        label="Buscar"
                                        placeholder="Buscar tareas..."
                                        leftIcon={<Search size={16} />}
                                    />
                                    <Input
                                        label="Con error"
                                        placeholder="Input con error"
                                        error="Este campo es requerido"
                                    />
                                    <Input
                                        label="Deshabilitado"
                                        placeholder="Input deshabilitado"
                                        disabled
                                    />
                                </div>
                            </div>
                        </div>
                    </section>

                    <section style={{ marginBottom: '3rem' }}>
                        <h3>📦 Dependencias Instaladas</h3>
                        <ul style={{ lineHeight: '1.8' }}>
                            <li><strong>@tanstack/react-query</strong> - Data fetching y cache management</li>
                            <li><strong>zustand</strong> - Estado global ligero</li>
                            <li><strong>styled-components</strong> - CSS-in-JS con theming</li>
                            <li><strong>lucide-react</strong> - Iconos modernos (ver botones arriba)</li>
                            <li><strong>date-fns</strong> - Manipulación de fechas</li>
                            <li><strong>react-hook-form</strong> - Manejo de formularios</li>
                        </ul>
                    </section>

                    <section>
                        <h3>🚀 Próximos pasos</h3>
                        <ul style={{ lineHeight: '1.8' }}>
                            <li>✅ Estructura de carpetas creada</li>
                            <li>✅ Dependencias instaladas</li>
                            <li>✅ React Query configurado</li>
                            <li>✅ Componentes base (Button, Input) creados</li>
                            <li>⏳ Implementar stores de Zustand</li>
                            <li>⏳ Configurar React Router</li>
                            <li>⏳ Desarrollar features (Tasks, Calendar, Timer, Dashboard)</li>
                        </ul>
                    </section>
                </main>

                <footer style={{ marginTop: '4rem', textAlign: 'center', opacity: 0.7, paddingTop: '2rem', borderTop: '1px solid #e5e7eb' }}>
                    <p>Desarrollado con ❤️ usando React + TypeScript + Vite</p>
                </footer>
            </div>
        </>
    );
}

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider>
                <AppContent />
            </ThemeProvider>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}

export default App;
