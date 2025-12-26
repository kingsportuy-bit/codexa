"use client";

export function ProductsHeader() {
    return (
        <section className="relative py-20 px-4">
            <div className="max-w-7xl mx-auto">

                {/* Divider Line */}
                <div className="mb-12 flex items-center gap-4">
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
                    <div className="px-4 py-2 rounded-full bg-accent/10 border border-accent/30">
                        <span className="text-sm font-semibold text-accent uppercase tracking-wider">
                            Nuestros Productos
                        </span>
                    </div>
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
                </div>

                {/* Description */}
                <div className="text-center max-w-3xl mx-auto">
                    <p className="text-lg text-zinc-400">
                        Además de desarrollo a medida, creamos productos propios que resuelven problemas reales de negocios.
                    </p>
                </div>

            </div>
        </section>
    );
}
