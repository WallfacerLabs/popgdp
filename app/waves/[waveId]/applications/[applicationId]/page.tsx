import { notFound } from "next/navigation";
import { db } from "@/drizzle/db";
import { applications } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

import { auth } from "@/lib/auth";
import { formatDate } from "@/lib/dates";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";

export default async function Application({
  params,
}: {
  params: { applicationId: string };
}) {
  const application = await db.query.applications.findFirst({
    where: eq(applications.id, Number(params.applicationId)),
    with: {
      users: {
        columns: {
          image: true,
          name: true,
        },
      },
    },
  });

  if (!application) {
    return notFound();
  }

  return (
    <div className="flex w-full flex-col gap-4">
      <h2 className="text-2xl">{application.name}</h2>
      <Card className="flex gap-8 px-6">
        <Avatar className="my-6">
          <AvatarFallback />

          <AvatarImage
            src={application.users.image || undefined}
            alt={
              application.users.name
                ? `${application.users.name} avatar`
                : undefined
            }
          />
        </Avatar>
        <div className="my-4">
          <div className="mb-4 flex justify-between text-gray-600">
            <div className="font-medium">{application.users.name}</div>
            <div className="text-sm">{formatDate(application.createdAt)}</div>
          </div>
          <p className="text-justify">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi
            exercitationem dicta aspernatur veniam doloremque tempora harum
            officia quo fugit assumenda. Vero ad obcaecati optio ab iusto natus,
            quam iure ullam. Odit laboriosam maxime numquam amet doloribus
            velit, fugit eius doloremque deleniti non inventore soluta nobis
            deserunt similique! Molestias commodi molestiae magni quisquam? Et
            dolorum voluptatum quod id inventore quae sapiente! Temporibus cum
            consectetur iure eius, eaque qui rerum neque quo, vitae reiciendis
            distinctio quas obcaecati. Maxime dolorum obcaecati esse voluptatem
            sapiente, repudiandae dolores beatae, aut autem debitis ab dolore
            impedit! Alias inventore repellat illum! Doloribus facilis cum,
            consequatur blanditiis officiis adipisci, a nostrum voluptatem sint
            minus soluta unde illo voluptates, nesciunt fuga? Nostrum, quod.
            Voluptatum sapiente molestiae id veritatis in. Ea, quae repellendus.
            Quia, dolorem beatae natus non adipisci laudantium minus. Quos
            tempore nostrum optio doloribus aut reprehenderit, vel beatae sequi
            quia molestias expedita adipisci dolorum consectetur cum ducimus
            commodi! Praesentium est rem molestias dolores sunt possimus dicta
            laudantium sequi minus quidem saepe eos, soluta, ut dolore vero
            libero quos recusandae cupiditate tenetur officia illum nam enim.
            Praesentium, debitis molestias! Labore nihil optio deserunt
            sapiente. Optio atque, sed et sequi totam rerum voluptates similique
            est eum, soluta voluptas vero maxime excepturi vel inventore modi
            libero tempora aperiam fuga. Error, reiciendis! Quis, reprehenderit
            delectus amet eos quo vel minus exercitationem eum dolores possimus
            culpa totam sint ad, molestiae cum, sunt qui natus tenetur nostrum
            id quam sequi? Maxime quos totam rem? Earum dicta ullam maxime quod
            dolores praesentium repellat magnam ex fugiat ea quidem, hic aliquam
            atque vel blanditiis mollitia ratione. Commodi cum reiciendis vero,
            neque aliquid eum magni qui libero. Porro, modi. Similique, dolorum
            nulla accusantium perspiciatis aut accusamus rerum dolor. Totam
            recusandae, exercitationem perferendis, veniam quod accusamus ipsam
            enim atque deserunt, aliquam reiciendis non nobis laudantium maiores
            fugiat eaque? Vitae quasi aliquam dolore magnam dicta neque deleniti
            aliquid? Quibusdam suscipit, est autem similique soluta laborum
            error inventore velit aut, at sed doloremque ipsum quam! Cumque
            quasi iure labore error. Commodi nam quam nesciunt in repellendus
            aliquid omnis, illo dolores nihil, nemo voluptas soluta sed
            repudiandae a, ipsam esse. Consequatur, provident. Consequuntur,
            eaque laborum? Maxime possimus culpa quae itaque iusto?
          </p>
        </div>
      </Card>
    </div>
  );
}
