"use client"

import MediaButtons from "@/components/MediaButtons";
import Player from "@madzadev/audio-player";
import "@madzadev/audio-player/dist/index.css";

// TODO: Complete redesign.

// TODO: Grab 

export default function PodcastPlayer() {
  const colors = {
    playerBackground: "#d1d5db",
    titleColor: "#000000",
    timeColor: "#000000",
    progressSlider: "#eab308",
    progressUsed: "#000000",
    progressLeft: "#151616",
    bufferLoaded: "#202222",
    volumeSlider: "#eab308",
    volumeUsed: "#000000",
    volumeLeft: "#151616",
  };
  
  const tracks = [
    {
      url: "StarWars60.wav",
      title: "Test",
      tags: [],
    },
    {
      url: "https://audioplayer.madza.dev/Madza-Late_Night_Drive.mp3",
      title: "Test2",
      tags: [],
    }
  ];

  return (
    <div className="flex flex-col h-screen">
      <div className="flex justify-center h-4/5">
        <div className="flex flex-col items-center w-1/2">
          <div className="flex mt-4 w-screen rounded-md bg-gray-300">
            <p className="mr-2 p-2 w-full text-center font-bold">
              Podcast Player
            </p>
          </div>
          <div className="h-3/4 overflow-y-auto">
            <p className="m-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum
              quam consectetur corporis laudantium excepturi explicabo
              voluptate, eum nam fugit molestiae esse adipisci? Consectetur
              eaque libero quia blanditiis? Debitis, incidunt ab.
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cupiditate pariatur accusantium minus ratione. Laborum porro amet, quaerat autem, sit consequatur voluptatibus omnis iusto ea molestiae dolor voluptatem quo atque soluta!
              Accusamus nam, quia quod voluptas pariatur facilis neque ducimus iusto saepe! Numquam reiciendis amet labore ab placeat voluptatum facere sapiente incidunt, enim odit, sit quod error voluptatibus possimus necessitatibus officia.
              Eaque quo sapiente iure quaerat, reiciendis quia, fugiat, corporis beatae modi similique numquam ea omnis laudantium dolorem in. Fugit tempore nemo impedit, repellendus praesentium iusto magni quia iste sunt vitae?
              Similique iusto illum voluptas, repellendus perspiciatis laudantium fuga nesciunt quaerat dolore libero tenetur error hic eligendi sequi placeat temporibus, est accusantium expedita rerum culpa laboriosam tempora quae quasi? Quibusdam, sed!
              Earum sit pariatur, esse aspernatur quidem nesciunt obcaecati numquam at velit consequatur maxime accusantium nemo aut sed, illo ab cupiditate quaerat non, laudantium atque tempore architecto dolore tempora sunt? Sapiente!
              Officiis mollitia fugit laboriosam, quod recusandae, ad praesentium, dignissimos magnam quae amet accusantium nesciunt rem reprehenderit veniam! Laudantium nisi iste, odit a assumenda, reiciendis velit suscipit ad vero molestias reprehenderit!
              Tempore libero, dolorum explicabo impedit voluptatem dicta exercitationem qui? Libero ipsam voluptate provident mollitia modi consectetur fugiat labore cupiditate doloremque expedita inventore nulla excepturi aut at voluptatem, non eveniet animi.
              Expedita provident quasi laborum at impedit nemo sint dolores dignissimos accusantium eius ea veniam, deserunt libero dicta inventore sit adipisci repudiandae alias error optio reiciendis. Velit, laboriosam eveniet. Velit, eaque.
              Quas at incidunt perferendis, consequuntur accusantium nam eum deserunt nulla cumque aspernatur beatae nesciunt inventore dolorum numquam quidem tempora quasi dolores quia commodi minus? Explicabo repellat itaque obcaecati nesciunt similique?
              In, et dolorem laborum delectus molestiae sint sequi ea! Non dolor unde possimus ipsum, culpa nulla maxime libero amet, laudantium iusto animi reiciendis accusantium iste. Quisquam aut enim tenetur cumque!
              Fuga natus voluptatum quae libero ipsam. Quas maiores minima, dolore quam et temporibus rerum numquam, voluptatibus praesentium quibusdam repellendus earum explicabo nulla magni provident dolores sunt, facere debitis ipsum pariatur?
              Qui rerum quos suscipit ea quasi. Voluptatibus repudiandae aliquam quae itaque delectus, rerum laboriosam vel dicta commodi animi! Qui, rem nobis quo dolor ad expedita facere quaerat dolorem. Assumenda, odio.
              Nostrum ratione praesentium laudantium quis, ex impedit a odio itaque facilis sapiente accusamus soluta doloremque, assumenda ducimus. Suscipit sit nam, architecto beatae culpa tenetur accusantium ipsa, doloribus, eum voluptatum dolorum?
              Hic fuga perspiciatis reprehenderit dolores corporis amet voluptas numquam ad commodi quas delectus quo cupiditate quos alias non dolor, exercitationem doloribus totam consequatur cumque. Dolorem perferendis deleniti dolores esse rem.
              Quam dolor enim aliquid, nobis recusandae quaerat quisquam, qui accusantium explicabo quasi voluptates. Nesciunt delectus veniam aliquid sint, quo minima impedit exercitationem inventore, est vitae accusamus commodi, asperiores nostrum voluptates!
              Omnis laborum rerum labore voluptas animi alias ipsam nulla cumque perferendis explicabo deleniti iusto blanditiis architecto, quas commodi, tempora eum dolorem esse totam exercitationem necessitatibus! Eius quod quos error odio?
              Vero deserunt quis cumque tempora perspiciatis sunt neque ullam excepturi nobis aspernatur? Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa cupiditate atque sed dolorum dicta iure natus totam nesciunt reiciendis, explicabo facilis doloribus eveniet odit laudantium in consequatur repellendus aspernatur perspiciatis.
              Nihil esse culpa laudantium, cumque neque consequuntur odio, placeat harum nesciunt ex eos, fugit voluptates. Esse eveniet accusantium quae, velit hic necessitatibus dolorum repellat cum ad aliquam, ducimus provident unde!
              Consequuntur fugiat excepturi dicta laboriosam? Ab distinctio quisquam laboriosam voluptates natus reiciendis deleniti nostrum eos accusantium quas cupiditate ullam aliquid perspiciatis dolores ipsam placeat id, odio tempora ut asperiores quod.
              At est distinctio saepe expedita fugit reprehenderit inventore deserunt quas suscipit minima. Reiciendis necessitatibus adipisci totam, minus, sed dolorum corrupti ab nisi est incidunt quae at sint ad! Molestias, eligendi?
              Tenetur quaerat cupiditate debitis molestiae eveniet veritatis minus dolorem quibusdam fuga. Similique libero, quae tenetur labore quos, id corrupti quis adipisci a soluta non eos error laudantium, distinctio eum est.
              Recusandae a, voluptas nemo explicabo commodi quasi culpa autem odit vitae quis accusamus sit expedita eum quos accusantium laudantium quam sed ratione dicta molestias inventore perferendis? Ullam est repellendus similique.
              Magnam dignissimos explicabo veniam, vero inventore quasi nobis sed consectetur cum doloribus, quidem atque ratione fugiat aliquid hic vel obcaecati voluptas quae aut modi aliquam illum nesciunt provident? Magnam, in.
              Illo reprehenderit tempora cupiditate laudantium esse dicta corporis fuga officiis, molestiae distinctio architecto est quaerat, delectus dolor. Obcaecati fugit adipisci incidunt non ex distinctio animi placeat ipsum consectetur? Possimus, asperiores?
              Repudiandae maxime nam laudantium doloribus dolorum! Ullam nam quam dolore numquam aut beatae dicta perferendis? Saepe nisi facilis amet! Dolorum ab perferendis quaerat repellendus odio perspiciatis omnis enim in consectetur.
              Mollitia, magni doloribus, ipsa, magnam dolorem accusamus vero vitae asperiores alias tenetur cum ex praesentium animi. Repellat dolore, voluptatibus tenetur reprehenderit porro impedit aperiam sequi alias optio neque harum unde!Ratione repellat molestias esse sunt cupiditate? Deleniti aliquam iusto est nemo quas, illum id autem laborum eligendi placeat.
              Assumenda, libero veritatis. Odio iure reiciendis accusantium explicabo assumenda neque eius nam corporis laudantium obcaecati nostrum, debitis facere, voluptates ducimus dolores laborum dolor accusamus delectus, eum necessitatibus a saepe. Doloribus.
              Quasi, ullam aliquam eligendi laboriosam voluptatibus, quia itaque earum assumenda optio quae dolores consectetur rerum? Esse, facere fuga et consequuntur iure molestiae corrupti tenetur vitae deleniti ea laborum illo eveniet.
            </p>
          </div>
          <div className="bg-gray-300 w-screen flex justify-center fixed bottom-0 left-0">
            <div className="w-2/3 ">
              <Player
                trackList={tracks}
                includeTags={false}
                includeSearch={false}
                showPlaylist={false}
                sortTracks={true}
                autoPlayNextTrack={true}
                customColorScheme={colors}
              />
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}


