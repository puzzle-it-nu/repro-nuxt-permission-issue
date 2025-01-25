# Minimal reproduction

- clone the repo
- cd into the folder
- pnpm i
- pnpm dev (it works)
- sudo chown 1234:1234 fatal_directory # this in itself is no problem since the `other` group has read access
- sudo chmod 750 fatal_directory # this makes it into a problem because `other` doesn't have access anymore
- pnpm dev (it fails)

```
~/dev/repro-nuxt-permission-issue$ pnpm dev

> nuxt-app@ dev /home/PUZZLE-IT/joop/dev/repro-nuxt-permission-issue
> nuxt dev

Nuxt 3.15.3 with Nitro 2.10.4                                                                                                                  nuxi 8:21:54 PM
                                                                                                                                                    8:21:54 PM
  ➜ Local:    http://localhost:3000/
  ➜ Network:  use --host to expose

  ➜ DevTools: press Shift + Alt + D in the browser (v1.7.0)                                                                                         8:21:56 PM


 ERROR  [unhandledRejection] EACCES: permission denied, watch '/home/PUZZLE-IT/joop/dev/repro-nuxt-permission-issue/fatal_directory'                8:21:56 PM

    at FSWatcher.<computed> (node:internal/fs/watchers:247:19)
    at Object.watch (node:fs:2468:36)
    at createFsWatchInstance (node_modules/.pnpm/chokidar@3.6.0/node_modules/chokidar/lib/nodefs-handler.js:119:15)
    at setFsWatchListener (node_modules/.pnpm/chokidar@3.6.0/node_modules/chokidar/lib/nodefs-handler.js:166:15)
    at NodeFsHandler._watchWithNodeFs (node_modules/.pnpm/chokidar@3.6.0/node_modules/chokidar/lib/nodefs-handler.js:331:14)
    at NodeFsHandler._handleDir (node_modules/.pnpm/chokidar@3.6.0/node_modules/chokidar/lib/nodefs-handler.js:567:19)
    at process.processTicksAndRejections (node:internal/process/task_queues:105:5)
    at async NodeFsHandler._addToNodeFs (node_modules/.pnpm/chokidar@3.6.0/node_modules/chokidar/lib/nodefs-handler.js:617:16)

[nuxi:nuxi 8:21:56 PM] ℹ Restarting Nuxt due to error: Error: EACCES: permission denied, watch '/home/PUZZLE-IT/joop/dev/repro-nuxt-permission-issue/fatal_directory'
```

Patching chokidar@3.6.0 where I always set `ignorePermissionErrors` to true makes running the dev server work


```
pnpm patch chokidar
✔ Choose which version to patch · 3.6.0
You can now edit the following folder: /tmp/713a3f5ffc770dd61408e9538f5e8d43

Once you're done with your changes, run "pnpm patch-commit '/tmp/713a3f5ffc770dd61408e9538f5e8d43'"
joop@lichthuis:~/dev/repro-nuxt-permission-issue$ pnpm patch-commit '/tmp/713a3f5ffc770dd61408e9538f5e8d43'
 WARN  2 deprecated subdependencies found: glob@7.2.3, inflight@1.0.6
Packages: -1
-
Progress: resolved 661, reused 609, downloaded 0, added 1, done

> nuxt-app@ postinstall /home/PUZZLE-IT/joop/dev/repro-nuxt-permission-issue
> nuxt prepare

✔ Types generated in .nuxt                                                                                                                    nuxi 8:27:33 PM
joop@lichthuis:~/dev/repro-nuxt-permission-issue$ pnpm dev

> nuxt-app@ dev /home/PUZZLE-IT/joop/dev/repro-nuxt-permission-issue
> nuxt dev

Nuxt 3.15.3 with Nitro 2.10.4                                                                                                                  nuxi 8:27:42 PM
                                                                                                                                                    8:27:42 PM
  ➜ Local:    http://localhost:3000/
  ➜ Network:  use --host to expose

  ➜ DevTools: press Shift + Alt + D in the browser (v1.7.0)                                                                                         8:27:44 PM

ℹ Re-optimizing dependencies because lockfile has changed                                                                                          8:27:45 PM
✔ Vite client built in 57ms                                                                                                                        8:27:45 PM
✔ Vite server built in 609ms                                                                                                                       8:27:46 PM
✔ Nuxt Nitro server built in 1095 ms                                                                                                         nitro 8:27:47 PM
ℹ Vite client warmed up in 3ms                                                                                                                     8:27:47 PM
ℹ Vite server warmed up in 1112ms                             
```
