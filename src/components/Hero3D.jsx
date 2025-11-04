import Spline from '@splinetool/react-spline';
import { motion } from 'framer-motion';

export default function Hero3D() {
  return (
    <section className="relative w-full h-[520px] md:h-[600px] overflow-hidden">
      <Spline
        scene="https://prod.spline.design/4Zh-Q6DWWp5yPnQf/scene.splinecode"
        style={{ width: '100%', height: '100%' }}
      />

      {/* Gradient overlay for readability */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(11,15,26,0)_0%,rgba(11,15,26,0.3)_45%,rgba(11,15,26,0.75)_100%)]" />

      {/* Headline */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="text-center px-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-xs text-white/80 mb-4">
            <span className="inline-block h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
            Modern • Glassmorphic • Animasi 3D
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white drop-shadow-sm">
            TabunganKu
          </h1>
          <p className="mt-3 md:mt-4 text-white/70 max-w-2xl mx-auto">
            Catat pemasukan dan pengeluaranmu dalam tampilan futuristik yang halus, gelap, dan menyenangkan digunakan.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
