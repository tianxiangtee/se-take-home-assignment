const { spawn } = require("child_process");

test("Display bots when user inputs 'b'", (done) => {
  const app = spawn("node", ["app.js"]);

  app.stdout.once("data", () => {
    // input 'b'
    app.stdin.write("b\n");

    app.stdout.once("data", (data) => {
      expect(data.toString()).toContain("There are no bots");

      // add a bot
      app.stdin.write("+\n");

      app.stdout.once("data", (data) => {
        expect(data.toString()).toContain("New bot added");

        // input 'b' again
        app.stdin.write("b\n");

        app.stdout.once("data", (data) => {
          expect(data.toString()).toContain("Bot 1 is idle");

          // remove the bot
          app.stdin.write("-\n");

          app.stdout.once("data", (data) => {
            expect(data.toString()).toContain("Bot 1 was removed while idle");

            app.kill("SIGINT");
            done();
          });
        });
      });
    });
  });
});


test("Add new normal order when user inputs 'n'", (done) => {
  const app = spawn("node", ["app.js"]);

  app.stdout.once("data", () => {
    // input 'p'
    app.stdin.write("p\n");

    app.stdout.once("data", (data) => {
      expect(data.toString()).toContain("There are no pending order");

      // add a order
      app.stdin.write("n\n");

      app.stdout.once("data", (data) => {
        expect(data.toString()).toContain("New Normal order added with order number 1 and status PENDING");

        // input 'p' again
        app.stdin.write("p\n");

        app.stdout.once("data", (data) => {
          expect(data.toString()).toContain("===== PENDING AREA =====");

          app.stdout.once("data", (data) => {
            expect(data.toString()).toContain("Order No : 1(Normal)");
  
            app.kill("SIGINT");
            done();
  
          });

        });
      });
    });
  });
});
