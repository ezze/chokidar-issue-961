# chokidar-issue-961

The purpose of this repo is to reproduce [chokidar](https://github.com/paulmillr/chokidar/issues/961) issue when copying big files with `rsync` and using option `usePolling=true`. 

## How to reproduce

```
$ yarn
$ node server.js
```

This code will create watched directory named `dir` and directory `data` including two big files `file1` and `file2`. After that `data` directory will be copied to `dir` with `rsync -a ./data ./dir/`. When it's done an `add` event for `file2` will be missed.

### Actual output

```
addDir: /home/ezze/Development/chokidar-issue-961/dir
addDir: /home/ezze/Development/chokidar-issue-961/dir/data
add: /home/ezze/Development/chokidar-issue-961/dir/data/.file1.SExhbm
change: /home/ezze/Development/chokidar-issue-961/dir/data/.file1.SExhbm
change: /home/ezze/Development/chokidar-issue-961/dir/data/.file1.SExhbm
change: /home/ezze/Development/chokidar-issue-961/dir/data/.file1.SExhbm
change: /home/ezze/Development/chokidar-issue-961/dir/data/.file1.SExhbm
change: /home/ezze/Development/chokidar-issue-961/dir/data/.file1.SExhbm
change: /home/ezze/Development/chokidar-issue-961/dir/data/.file1.SExhbm
change: /home/ezze/Development/chokidar-issue-961/dir/data/.file1.SExhbm
change: /home/ezze/Development/chokidar-issue-961/dir/data/.file1.SExhbm
change: /home/ezze/Development/chokidar-issue-961/dir/data/.file1.SExhbm
change: /home/ezze/Development/chokidar-issue-961/dir/data/.file1.SExhbm
change: /home/ezze/Development/chokidar-issue-961/dir/data/.file1.SExhbm
change: /home/ezze/Development/chokidar-issue-961/dir/data/.file1.SExhbm
change: /home/ezze/Development/chokidar-issue-961/dir/data/.file1.SExhbm
change: /home/ezze/Development/chokidar-issue-961/dir/data/.file1.SExhbm
change: /home/ezze/Development/chokidar-issue-961/dir/data/.file1.SExhbm
change: /home/ezze/Development/chokidar-issue-961/dir/data/.file1.SExhbm
change: /home/ezze/Development/chokidar-issue-961/dir/data/.file1.SExhbm
change: /home/ezze/Development/chokidar-issue-961/dir/data/.file1.SExhbm
change: /home/ezze/Development/chokidar-issue-961/dir/data/.file1.SExhbm
change: /home/ezze/Development/chokidar-issue-961/dir/data/.file1.SExhbm
unlink: /home/ezze/Development/chokidar-issue-961/dir/data/.file1.SExhbm
add: /home/ezze/Development/chokidar-issue-961/dir/data/.file2.689CjX
add: /home/ezze/Development/chokidar-issue-961/dir/data/file1
change: /home/ezze/Development/chokidar-issue-961/dir/data/.file2.689CjX
change: /home/ezze/Development/chokidar-issue-961/dir/data/.file2.689CjX
change: /home/ezze/Development/chokidar-issue-961/dir/data/.file2.689CjX
change: /home/ezze/Development/chokidar-issue-961/dir/data/.file2.689CjX
change: /home/ezze/Development/chokidar-issue-961/dir/data/.file2.689CjX
change: /home/ezze/Development/chokidar-issue-961/dir/data/.file2.689CjX
change: /home/ezze/Development/chokidar-issue-961/dir/data/.file2.689CjX
change: /home/ezze/Development/chokidar-issue-961/dir/data/.file2.689CjX
change: /home/ezze/Development/chokidar-issue-961/dir/data/.file2.689CjX
change: /home/ezze/Development/chokidar-issue-961/dir/data/.file2.689CjX
change: /home/ezze/Development/chokidar-issue-961/dir/data/.file2.689CjX
change: /home/ezze/Development/chokidar-issue-961/dir/data/.file2.689CjX
change: /home/ezze/Development/chokidar-issue-961/dir/data/.file2.689CjX
change: /home/ezze/Development/chokidar-issue-961/dir/data/.file2.689CjX
change: /home/ezze/Development/chokidar-issue-961/dir/data/.file2.689CjX
change: /home/ezze/Development/chokidar-issue-961/dir/data/.file2.689CjX
change: /home/ezze/Development/chokidar-issue-961/dir/data/.file2.689CjX
change: /home/ezze/Development/chokidar-issue-961/dir/data/.file2.689CjX
change: /home/ezze/Development/chokidar-issue-961/dir/data/.file2.689CjX
change: /home/ezze/Development/chokidar-issue-961/dir/data/.file2.689CjX
unlink: /home/ezze/Development/chokidar-issue-961/dir/data/.file2.689CjX
```

### Expected output

Expected the same as above but including `add` event for `file2`:

```
unlink: /home/ezze/Development/chokidar-issue-961/dir/data/.file2.689CjX
add: /home/ezze/Development/chokidar-issue-961/dir/data/file2
```
