j'ai ce message :


Console Error

A tree hydrated but some attributes of the server rendered HTML didn't match the client properties. This won't be patched up. This can happen if a SSR-ed Client Component used:

- A server/client branch `if (typeof window !== 'undefined')`. - Variable input such as `Date.now()` or `Math.random()` which changes each time it's called. - Date formatting in a user's locale which doesn't match the server. - External changing data without sending a snapshot of it along with the HTML. - Invalid HTML tag nesting.  It can also happen if the client has a browser extension installed which messes with the HTML before React loaded.

See more info here: https://nextjs.org/docs/messages/react-hydration-error

+Client-Server

  ...     <SegmentViewNode type="page" pagePath="page.tsx">       <SegmentTrieNode>       <ClientPageRoot Component={function Home} serverProvidedParams={{...}}>         <Home params={Promise} searchParams={Promise}>           <GeometricReliefBackground>           <GoldParticles>           <div className="relative m...">             <ScrollProgress>             <CommandPalette>             <Navbar>             <main>               <Hero>                 <section ref={{current:null}} id="hero" className="jsx-d4d931...">                   <div className="jsx-d4d931...">                     <div>                     <div className="jsx-d4d931...">                       <SwissCalibreWidget>                         <div ref={{current:null}} className="hidden lg:...">                           <div ref={{current:null}} className="relative w...">                             <div>                             <svg viewBox="0 0 400 400" className="w-full h-full">                               <defs>                               <circle>                               <circle>                               <line>                               <line>                               <line>                               <line>                               <line>                               <line>                               <line>                               <line>                               <line                                 x1={307.06089701741735}                                 y1={318.90317207638304}                                 x2={311.07568065557047} +                               y2={323.3620410292474} -                               y2="323.36204102924745"                                 stroke="rgba(255,255,255,0.16)"                                 strokeWidth="0.8"                                 strokeOpacity="0.4"                               >                               <line>                               <line>                               <line>                               <line>                               <line>                               <line>                               <line>                               <line>                               <line>                               <line>                               <line>                               <line>                               <line>                               <line>                               <line +                               x1={81.09682792361696} -                               x1="81.09682792361694"                                 y1={307.06089701741735} +                               x2={76.63795897075259} -                               x2="76.63795897075258"                                 y2={311.07568065557047}                                 stroke="rgba(255,255,255,0.16)"                                 strokeWidth="0.8"                                 strokeOpacity="0.4"                               >                               <line>                               <line>                               <line>                               <line>                               <line>                               <line>                               <line>                               <line>                               <line>                               <line>                               <line>                               <line>                               <line +                               x1={70.55728090000838} -                               x1="70.55728090000841"                                 y1={105.95435963320432} +                               x2={65.70317893375869} -                               x2="65.70317893375872"                                 y2={102.42764811944947}                                 stroke="rgba(255,255,255,0.16)"                                 strokeWidth="0.8"                                 strokeOpacity="0.4"                               >                               <line>                               <line>                               <line>                               <line                                 x1={122.99999999999993} +                               y1={66.63208781719649} -                               y1="66.63208781719646"                                 x2={116.99999999999993} +                               y2={56.23978297178323} -                               y2="56.2397829717832"                                 stroke="#D4A843"                                 strokeWidth="1.6"                                 strokeOpacity="0.75"                               >                               ...                               ...                             ...                   ...               ...             ...     ... 

src/components/ui/SwissCalibreWidget.tsx (86:15) @ <unknown>

84 |             const y2 = 200 + r2 * Math.sin(angle)

85 |             return (

> 86 |               <line

   |               ^

87 |                 key={i}

88 |                 x1={x1}

89 |                 y1={y1}

Call Stack23

Show 17 ignore-listed frame(s)

line

<anonymous>

<unknown>

src/components/ui/SwissCalibreWidget.tsx (86:15)

Array.map

<anonymous>

SwissCalibreWidget

src/components/ui/SwissCalibreWidget.tsx (76:39)

Hero

src/components/sections/Hero.tsx (257:11)

Home

src/app/page.tsx (69:11)


de plus fait bien attention a pas utiliser d'adjectif les ia adorent ça ,

aussi tu as ajouter certaines comptences ( redis , celery , que je savais meme pas que j'avais utilisé , c'est pourquoi je les avais enlever dans les version précedente , alors je pense qu'il vaudrait mieux les enlevé , meme mariaDB j'ai aucun souvenir mdr mais bon sur celle la je devrait peut etre me renseigner mais j'ai pas le souvenir d'avoir fait la db c'etait direct fait en quelque ligne dans le yaml je crois) sinon ultra fluide gg le truc rond y'a 1 truc en particulier qui focus pas mal alpine js comme si j'etait un expert alors que les autres c'est plus general c'est mieux pour le premier truc qu'on vois , en suite je sais que c'est dur mais y'a des patern ou des rectangles qui font vraiment ia et vu vu et revu mais ça je sais que c'est dur , apres il restera les images a regler et en vrai on est vraiment pas mal la , je veux bien avant de commencer que tu re fasse un iteration en prenant en compte tout ce que je t'ai dit + des amelioration que maintenant tu verrai , et que avant aussi tu m'explique comment t'as fait pour pas que ça crash cette fois ci que pour les prochaines conv j'explique directmeent