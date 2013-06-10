io:::start { @io = count(); } tick-1sec { printa("Disk I/Os per second: %@d\n", @io); trunc(@io); }
