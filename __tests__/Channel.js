const iris = require(`../cjs/index.js`);
const GUN = require(`gun`);
const load = require(`gun/lib/load`);
const then = require(`gun/lib/then`);
const radix = require(`gun/lib/radix`); // Require before instantiating Gun, if running in jsdom mode
const SEA = require(`gun/sea`);

const gun = new GUN({radisk: false});

test(`We say hi`, async (done) => {
  const myself = await iris.Key.generate();
  const friend = await iris.Key.generate();
  const friendsChannel = new iris.Channel({ gun: gun, key: friend, participants: myself.pub });
  const myChannel = new iris.Channel({
    gun: gun,
    key: myself,
    participants: friend.pub
  });
  myChannel.getMessages((msg, info) => {
    expect(msg.text).toEqual(`hi`);
    expect(info.selfAuthored).toBe(true);
    done();
  });
  myChannel.send(`hi`);
});
test(`Set and get msgsLastSeenTime`, async (done) => {
  const myself = await iris.Key.generate();
  const myChannel = new iris.Channel({
    gun: gun,
    key: myself,
    participants: myself.pub
  });
  const t = new Date();
  myChannel.setMyMsgsLastSeenTime();
  myChannel.getMyMsgsLastSeenTime(time => {
    expect(time).toBeDefined();
    expect(new Date(time).getTime()).toBeGreaterThanOrEqual(t.getTime());
    done();
  });
});

test(`Friend says hi`, async (done) => {
  const myself = await iris.Key.generate();
  const friend = await iris.Key.generate();
  const myChannel = new iris.Channel({
    gun: gun,
    key: myself,
    participants: friend.pub,
  });

  const friendsChannel = new iris.Channel({ gun: gun, key: friend, participants: myself.pub });
  friendsChannel.send(`hi`);
  myChannel.getMessages((msg) => {
    if (msg.text === `hi`) {
      done();
    }
  });
});
