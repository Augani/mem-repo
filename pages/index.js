import Head from 'next/head'
import React, { ChangeEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion'
import { setInterval } from 'timers';


const Moods = {
  "normal": "https://res.cloudinary.com/augani/image/upload/v1626118718/mems-png/Character_Mary_Skin_tone_Black_Posture_3_Sad.png",
  "happy": "https://res.cloudinary.com/augani/image/upload/v1626118728/mems-png/Character_Mary_Skin_tone_Black_Posture_17_Happy_Winking.png"
}

const FloatinImages = [
  "https://res.cloudinary.com/augani/image/upload/v1626118177/mems-png/Person_George_Skin_Tone_Black_Posture_10_Kiss.png",
  "https://res.cloudinary.com/augani/image/upload/v1626118176/mems-png/Person_Francis_Skin_Tone_White_Posture_25_Mouth_Covering.png",
  "https://res.cloudinary.com/augani/image/upload/v1626118464/mems-png/Character_Helen_Skin_tone_Black_Posture_17_Happy_Winking.png",
  "https://res.cloudinary.com/augani/image/upload/v1626118505/mems-png/Character_Ishanvi_Skin_tone_Black_Posture_15_Grinning.png",
  "https://res.cloudinary.com/augani/image/upload/v1626118903/mems-png/Character_Angela_Skin_tone_Black_Posture_26_Crossing_Finger.png",
  "https://res.cloudinary.com/augani/image/upload/v1626118201/mems-png/Person_Karim_Skin_Tone_White_Posture_16_Winking.png",
  "https://res.cloudinary.com/augani/image/upload/v1626118195/mems-png/Person_Justin_Skin_Tone_White_Posture_20_Like.png",
  "https://res.cloudinary.com/augani/image/upload/v1626118187/mems-png/Person_John_Skin_Tone_White_Posture_11_Party.png",
  "https://res.cloudinary.com/augani/image/upload/v1626118611/mems-png/Character_Kate_Skin_tone_Black_Posture_29_Scream.png",
  "https://res.cloudinary.com/augani/image/upload/v1626118611/mems-png/Character_Kate_Skin_tone_White_Posture_1_Happy.png",
  "https://res.cloudinary.com/augani/image/upload/v1626118803/mems-png/Character_Priyanka_Skin_tone_Black_Posture_8_Star_Eye.png",
  "https://res.cloudinary.com/augani/image/upload/v1626118865/mems-png/Character_Rosa_Skin_tone_White_Posture_5_Heart_Eye.png",
  "https://res.cloudinary.com/augani/image/upload/v1626118676/mems-png/Character_Kim_Skin_tone_White_Posture_25_Mouth_Covering.png",
  "https://res.cloudinary.com/augani/image/upload/v1626118644/mems-png/Character_Kim_Skin_tone_Black_Posture_12_Angry.png",
  "https://res.cloudinary.com/augani/image/upload/v1626118579/mems-png/Character_Jeniffer_Skin_tone_White_Posture_14_Bad_Word.png",
  "https://res.cloudinary.com/augani/image/upload/v1626118131/mems-png/Person_Donald_Skin_Tone_Black_Posture_7_Mind_blowing.png",
  "https://res.cloudinary.com/augani/image/upload/v1626118128/mems-png/Person_Chris_Skin_Tone_White_Posture_26_Crossing_Finger.png",
  "https://res.cloudinary.com/augani/image/upload/v1626118117/mems-png/Person_Chris_Skin_Tone_Black_Posture_17_Happy_Winking.png",
  "https://res.cloudinary.com/augani/image/upload/v1626118887/mems-png/Character_Angela_Skin_tone_Black_Posture_6_Sleeping.png"
]

export default function Home() {
  const [mood, setMood] = React.useState('normal')
  const [search, setSearch] = React.useState('');
  const [emojis, setEmojis] = React.useState([])
  const [float, setFloat]  = React.useState({x:Math.floor(Math.random() * 2000), y: Math.floor(Math.random() * -2000)});
  const ref = React.createRef();

  React.useEffect(()=>{
    const interval = setInterval(()=>{
      setFloat({
        x: Math.floor(Math.random() * -1500),
        y: Math.floor(Math.random() * -1500) 
      })
    }, 5000)

    return ()=>clearInterval(interval)
  }, [])

  const handleMousemove = (e) => {
    const x = e.clientX;
    const y = e.clientY;
    if (x < 420 && y > 500) {
      setMood("happy")
    } else {
      setMood("normal")
    }
  }
 

  React.useEffect(()=>{
    if(!search)return setEmojis([]);
    fetch(`/api/feed?search=${search.replaceAll(" ", "")}`).then((res)=>res.json())
    .then((resp)=>setEmojis(resp)).catch((e)=>{
    
    })
  }, [search])

  const onChange = (event) => {
    setSearch(event.currentTarget.value);
  }

  React.useEffect(() => {
    document.addEventListener('mousemove', handleMousemove);

    return () => document.removeEventListener('mousemove', () => console.log('removed'))
  })

  const getRandom = (initialX, initialY)=>{
      const randomPositiveX = Math.floor(Math.random() * 1500)
      const randomNegativeX = initialX 
      const randomPositiveY = Math.floor(Math.random() * 1000)
      const randomNegativeY = initialY 
      return {
        xP: randomPositiveX,
        xN: randomNegativeX,
        yP: randomPositiveY,
        yN: randomNegativeY
      }
  }
  return (
    <div className="flex flex-col w-screen h-screen items-center justify-center min-h-screen py-2 overflow-hidden relative">
      <Head>
        <title>Memojis</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className='w-full h-full flex flex-col lg:justify-center'>
      {FloatinImages.map((image)=>{
        return (
          <motion.div whileTap={{scale: 3}} drag layout dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0}}  whileHover={{scale: 3, transition: { duration: 1 }}} key={image} className="absolute h-16" transition={{repeat: Infinity, repeatDelay: 4, duration:5}} animate={{x:getRandom(float.x, float.y).xP, y:getRandom(float.x, float.y).yP}} initial={{x: getRandom(float.x, float.y).xN, y: getRandom(float.x, float.y).yN}}>
              <img  className="h-full" src={image} />
          </motion.div>
        )
      })}
      <nav className='absolute top-0 w-full flex flex-row-reverse'>
        <AnimatePresence>
          <motion.div  ref={ref} transition={{ ease: "easeOut", duration: 1 }} initial={{ opacity: 0, x: 200 }} animate={{ scale: 1.2, opacity: 1, x: 0 }}>
            <img className="h-12 lg:h-32" src={Moods[mood]} />
          </motion.div>
        </AnimatePresence>
      </nav>
      <main className="grid grid-cols-1 lg:grid-cols-2 w-full place-content-center">
        <section className="h-full w-full flex flex-col justify-center">
          <AnimatePresence >

            <motion.div
              key="form"
              transition={{ ease: "easeOut", duration: 1 }}
              initial={{ opacity: 0, x: -300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
            >
              <main className='flex flex-col p-2 lg:p-10 items-center lg:items-start'>
                <h1 className='text-5xl lg:text-8xl tracking-wide font-black text-red-900 mt-52 lg:mt-0  mb-6'>Free 2000+<br />Memojis for<br />Everyone</h1>
                <motion.div className="my-4 w-full" key='input'>
                  <input onChange={onChange} placeholder="Search for a mood, skin tone or gender" className='h-14 shadow-2xl w-full lg:w-96 rounded-md text-xl text-red-900 p-2 font-sans' />
                </motion.div>
              </main>

            </motion.div>

          </AnimatePresence>
        </section>

        <section className="h-full w-full flex flex-col justify-center items-center">
            {emojis.length > 0 && <div className="w-5/6 h-96 bg-transparent shadow-2xl rounded-md grid grid-cols-3 lg:grid-cols-6 gap-3 overflow-y-scroll">
                  {emojis.map((emoji)=>{
                    return (
                      <motion.div   whileHover={{scale: 1.1, transition: { duration: 1 }}} key={emoji.url} className=" h-20" >
                        <img  className="h-full" src={emoji.url} />
                    </motion.div>
                    )
                  })}
              </div>}
        </section>

      </main>


    </div>
 
    </div>
  )
}
