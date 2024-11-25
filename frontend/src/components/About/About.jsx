import React from 'react';
import { motion } from 'framer-motion';
import aboupngt from '../../assets/images/about.png'

const About = () => {
  return (

    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8 bg-primary w-full">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 pt-2 md:gap-8">
          <div>
            <div className="max-w-lg md:max-w-none">
              <h2 className="text-3xl lg:text-4xl font-bold pr-8 text-txtPrimary mb-2">
                About ReserveBite
              </h2>
              <div className="relative flex items-center mb-4">
                <div className="h-1 w-40 bg-secondary rounded-b-full"></div>
              </div>

              <p className="text-txtSecondary text-lg leading-relaxed pr-8">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur doloremque saepe
                architecto maiores repudiandae amet perferendis repellendus, reprehenderit voluptas
                sequi.
              </p>
            </div>
          </div>

          <div>
            <img
              src={aboupngt}
              className="rounded-full"
              alt=""
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;