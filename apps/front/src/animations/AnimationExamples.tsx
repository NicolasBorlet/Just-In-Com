'use client';

import { AnimatedHeading, AnimatedParagraph, AnimatedImage } from './';

export const AnimationExamples = () => {
  return (
    <div className="space-y-20 py-20">
      {/* Text Animations */}
      <section className="container mx-auto px-4">
        <AnimatedHeading 
          level={1} 
          className="text-4xl md:text-6xl font-bold text-center mb-8"
          options={{
            splitType: 'words',
            animationType: 'slideUp',
            duration: 0.8,
            stagger: 0.1
          }}
        >
          Animated Heading with Words
        </AnimatedHeading>
        
        <AnimatedParagraph 
          className="text-lg text-center max-w-2xl mx-auto"
          options={{
            splitType: 'chars',
            animationType: 'fadeIn',
            duration: 0.6,
            stagger: 0.02,
            delay: 0.5
          }}
        >
          This paragraph animates character by character with a beautiful fade-in effect.
        </AnimatedParagraph>
      </section>

      {/* Image Animations */}
      <section className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8">
          <AnimatedImage
            src="/next.svg"
            alt="Example image"
            width={500}
            height={300}
            containerClassName="rounded-lg"
            options={{
              animationType: 'slideUp',
              duration: 1,
              delay: 0.2
            }}
          />
          
          <AnimatedImage
            src="/vercel.svg"
            alt="Another example"
            width={500}
            height={300}
            containerClassName="rounded-lg"
            options={{
              animationType: 'scaleIn',
              duration: 1,
              delay: 0.4
            }}
            parallax={true}
            parallaxSpeed={0.3}
          />
        </div>
      </section>

      {/* Mixed Animations */}
      <section className="bg-gray-100 py-20">
        <div className="container mx-auto px-4">
          <AnimatedHeading 
            level={2} 
            className="text-3xl font-bold mb-6"
            options={{
              splitType: 'lines',
              animationType: 'slideUp',
              start: 'top 90%'
            }}
          >
            Different Animation Types
          </AnimatedHeading>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <AnimatedHeading 
                level={3} 
                className="text-xl font-semibold mb-4"
                options={{ animationType: 'slideUp', delay: 0.1 }}
              >
                Slide Up
              </AnimatedHeading>
              <AnimatedParagraph options={{ animationType: 'slideUp', delay: 0.2 }}>
                Text slides up from below with opacity fade.
              </AnimatedParagraph>
            </div>
            
            <div>
              <AnimatedHeading 
                level={3} 
                className="text-xl font-semibold mb-4"
                options={{ animationType: 'fadeIn', delay: 0.3 }}
              >
                Fade In
              </AnimatedHeading>
              <AnimatedParagraph options={{ animationType: 'fadeIn', delay: 0.4 }}>
                Simple opacity animation for subtle reveals.
              </AnimatedParagraph>
            </div>
            
            <div>
              <AnimatedHeading 
                level={3} 
                className="text-xl font-semibold mb-4"
                options={{ animationType: 'scaleIn', delay: 0.5 }}
              >
                Scale In
              </AnimatedHeading>
              <AnimatedParagraph options={{ animationType: 'scaleIn', delay: 0.6 }}>
                Text scales from smaller size with opacity.
              </AnimatedParagraph>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};