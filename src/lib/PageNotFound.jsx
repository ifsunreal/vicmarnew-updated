import { useLocation, Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Home, ArrowLeft } from 'lucide-react';

export default function PageNotFound({}) {
    const location = useLocation();
    const pageName = location.pathname.substring(1);

    const { data: authData, isFetched } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            try {
                const user = await base44.auth.me();
                return { user, isAuthenticated: true };
            } catch (error) {
                return { user: null, isAuthenticated: false };
            }
        }
    });

    return (
        <div className="min-h-screen bg-[#f8f6f0]">
            {/* Header */}
            <div className="relative bg-[#0a3620] pt-32 pb-20 px-4">
                <div className="absolute inset-0 bg-gradient-to-b from-[#0a3620]/80 to-[#0a3620]" />
                <div className="relative max-w-7xl mx-auto text-center">
                    <p className="text-xs tracking-[0.3em] uppercase text-[#4ade80] mb-4 font-sans font-medium header-animate header-animate-delay-1">Error 404</p>
                    <h1 className="text-7xl md:text-8xl lg:text-9xl font-light text-white/20 mb-4 header-animate header-animate-delay-1">
                        404
                    </h1>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-4 header-animate header-animate-delay-2">
                        Page Not <span className="italic">Found</span>
                    </h2>
                    <p className="text-white/50 text-base max-w-xl mx-auto font-light font-sans header-animate header-animate-delay-3">
                        The page <span className="text-white/70 font-medium">"{pageName}"</span> could not be found in this application.
                    </p>
                    <div className="w-16 h-[1px] bg-[#15803d] mx-auto mt-6 header-animate header-animate-delay-4" />
                </div>
            </div>

            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center space-y-8">
                    <p className="text-gray-500 font-light font-sans leading-relaxed">
                        The page you're looking for doesn't exist or may have been moved.
                        Please check the URL or navigate back to the homepage.
                    </p>

                    {/* Admin Note */}
                    {isFetched && authData.isAuthenticated && authData.user?.role === 'admin' && (
                        <div className="p-5 bg-white border border-gray-200 text-left">
                            <div className="flex items-start space-x-3">
                                <div className="flex-shrink-0 w-2 h-2 rounded-full bg-amber-400 mt-2"></div>
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-[#0a3620] tracking-wider uppercase font-sans">Admin Note</p>
                                    <p className="text-sm text-gray-500 leading-relaxed font-light font-sans">
                                        This could mean that the AI hasn't implemented this page yet. Ask it to implement it in the chat.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                        <button
                            onClick={() => window.history.back()}
                            className="inline-flex items-center gap-2 px-8 py-3 text-xs font-sans font-medium tracking-widest uppercase text-[#0a3620] bg-white border border-gray-200 hover:border-[#15803d] hover:text-[#15803d] transition-colors duration-300"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Go Back
                        </button>
                        <a
                            href="/"
                            className="inline-flex items-center gap-2 px-8 py-3 text-xs font-sans font-medium tracking-widest uppercase text-white bg-[#0a3620] hover:bg-[#0f4c2d] transition-colors duration-300"
                        >
                            <Home className="w-4 h-4" />
                            Go Home
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}
