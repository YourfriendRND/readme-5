import { PrismaClient } from '@prisma/client';

// Закоментировал так как ts-node при исполнении не видит пути через @project
// eslint-disable-next-line @nx/enforce-module-boundaries
import { PostTypes } from '../../../../../shared/types/src/lib/post.type';

function randomInt (a = 1, b = 0) {
    const lower = Math.ceil(Math.min(a, b));
    const upper = Math.floor(Math.max(a, b));
    return Math.floor(lower + Math.random() * (upper - lower + 1))
  };

function getRandomElement <T>(list: T[]): T {
    const randomindex = randomInt(0, list.length - 1);
    return list[randomindex];
}

const mockUsersId = [
    '65a3f63cc013e4c03afc6a9d',
    '65a3f64beb0cae3804f7d9ef',
    '65a3f657fb04b4c2846e9094',
    '65a3f65f2c1c3209873906fb',
    '65a3f66ac7d55ebb0a1b9b65'
];

const mockTags = [
    {
        id: 'c87b9c2e-eac3-4566-af41-92cd529b1567',
        name: 'селфи'
    },
    {
        id: 'adfc864c-d2f1-4737-918b-42537ff3368e',
        name: 'дружба'
    },
    {
        id: 'db662724-f91d-4b46-8291-bccee0cf1a91',
        name: 'житьвкайф'
    }
]

const mockComments = [
    {
        text: 'Первый комментарий',
        authorId: getRandomElement(mockUsersId),
    },
    {
        text: 'Еще один новый комментарий',
        authorId: getRandomElement(mockUsersId),
    },
    {
        text: 'Не придумал лучший комментарий, поэтому оставлю просто этот текст',
        authorId: getRandomElement(mockUsersId),
    },
    {
        text: 'Здесь могла быть ваша реклама',
        authorId: getRandomElement(mockUsersId)
    },
    {
        text: 'Лучший пост',
        authorId: getRandomElement(mockUsersId)
    },
];

const mockPosts = mockUsersId.map((id, idx) => {
    const randomNumber = randomInt(0, mockTags.length);
    const type = getRandomElement(Object.values(PostTypes));
    const anotherAuthorId = getRandomElement(mockUsersId);

    return {
        name: `Пост #${idx + 1}`,
        tags: mockTags.slice(0, randomNumber),
        authorId: id,
        status: 'published',
        type,
        comments: mockComments.slice(0, randomNumber),
        url: type === PostTypes.Link ? 'http://www.sample.com/?education=orange&reaction=detail' : undefined,
        photo: type === PostTypes.Photo ? 'https://pics4.city-data.com/cpicc/cfiles34653.jpg' : undefined,
        text: type === PostTypes.Text || type === PostTypes.Quote ? 'Simple text' : undefined,
        quoteAuthorId: type === PostTypes.Quote ? anotherAuthorId : undefined,
        announcement: type === PostTypes.Text ? 'Another text' : undefined,
        videoUrl: type === PostTypes.Video ? 'http://sample.edu/hobbies.html' : undefined,
    }
})

async function seedDb(prismaClient: PrismaClient): Promise<void> {
    for (const id of mockUsersId) {
        await prismaClient.user.upsert({
            where: { id: id },
            update: {},
            create: {
                id: id
            }
        })
    }

    for (const tag of mockTags) {
        await prismaClient.tag.upsert({
            where: { id: tag.id },
            update: {},
            create: {
                id: tag.id,
                name: tag.name
            }
        })
    }

    for (const post of mockPosts) {
        await prismaClient.post.create({
            data: {
                name: post.name,
                tags: {
                    connect: post.tags.map((tag) => ({id: tag.id})),
                },
                authorId: post.authorId,
                status: post.status,
                type: post.type,
                url: post.url,
                photo: post.photo,
                text: post.text,
                quoteAuthorId: post.quoteAuthorId,
                announcement: post.announcement,
                videoUrl: post.videoUrl,
                comments: post.comments.length ? {
                    create: post.comments
                } : undefined,
            }
        });
    }

    console.info('🤘️ Database was filled');
}

async function bootstrap() {
    const prismaClient = new PrismaClient();

    try {
      await seedDb(prismaClient);
      globalThis.process.exit(0);
    } catch (error: unknown) {
      console.error(error);
      globalThis.process.exit(1);
    } finally {
      await prismaClient.$disconnect();
    }
  }

  bootstrap();
