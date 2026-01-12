import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const formData = await req.json();
        const {
            inputMethod,
            prompt,
            photoFile,
            audioFile,
            oferta,
            angulo,
            estilo,
            animationType
        } = formData;

        // Build AI prompt based on form data
        let aiPrompt = '';

        if (inputMethod === 'prompt') {
            aiPrompt = prompt;
        } else {
            aiPrompt = 'Transform the uploaded image';
        }

        // Add strategic context to prompt
        const ofertaContext = getOfertaContext(oferta);
        const anguloContext = getAnguloContext(angulo);
        const estiloContext = getEstiloContext(estilo);

        const fullPrompt = `${aiPrompt}. 
    Contexto: ${ofertaContext}. 
    Enfoque: ${anguloContext}. 
    Estilo: ${estiloContext}. 
    Optimizado para Instagram, dimensiones cuadradas 1080x1080px, alta calidad, profesional.`;

        console.log('Generated prompt:', fullPrompt);

        // TODO: Integrate with OpenAI DALL-E or other AI service
        // For now, return a placeholder
        // const response = await openai.images.generate({
        //   model: "dall-e-3",
        //   prompt: fullPrompt,
        //   n: 1,
        //   size: "1024x1024",
        // });

        // Simulated response for development
        await new Promise(resolve => setTimeout(resolve, 3000));

        return NextResponse.json({
            success: true,
            url: 'https://via.placeholder.com/1080x1080/1a1a1a/00CCC2?text=Contenido+Generado',
            prompt: fullPrompt,
        });

    } catch (error) {
        console.error('Generation error:', error);
        return NextResponse.json(
            { success: false, error: 'Error generating content' },
            { status: 500 }
        );
    }
}

function getOfertaContext(oferta: string): string {
    const contexts: Record<string, string> = {
        'lanzamiento': 'nuevo producto o servicio siendo lanzado',
        'descuento': 'promoción especial con descuento limitado',
        'evento': 'evento o actividad especial',
        'servicio': 'servicio profesional disponible',
        'educativo': 'contenido educativo y de valor',
    };
    return contexts[oferta] || 'oferta comercial';
}

function getAnguloContext(angulo: string): string {
    const contexts: Record<string, string> = {
        'problema-solucion': 'muestra claramente el problema y la solución',
        'antes-despues': 'contraste visual de transformación',
        'prueba-social': 'incluye elementos de testimonios o resultados',
        'urgencia': 'transmite urgencia y escasez',
        'tutorial': 'visual educativo paso a paso',
        'detras-camaras': 'auténtico y transparente',
    };
    return contexts[angulo] || 'enfoque directo';
}

function getEstiloContext(estilo: string): string {
    const contexts: Record<string, string> = {
        'minimalista': 'diseño limpio, minimalista, espacios en blanco',
        'colorido': 'colores vibrantes, energético, llamativo',
        'profesional': 'corporativo, elegante, sofisticado',
        'moderno': 'moderno, tecnológico, futurista',
        'vintage': 'retro, nostálgico, texturizado',
        'elegante': 'refinado, lujoso, premium',
    };
    return contexts[estilo] || 'estilo moderno';
}
