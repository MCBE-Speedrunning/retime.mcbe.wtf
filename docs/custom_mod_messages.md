# Custom Mod Messages

The website offers support for a variety of variables that can be used in your custom mod messages.
Variables can be used with the `${VAR}` syntax. Anyone who has programmed/scripted in a language
such as Shell Script should be familiar with this syntax.

The following variables are supported:
	- `H` (Hours)

	- `M` (Minutes)

	- `S` (Seconds)

	- `MS` (Milliseconds)

	- `PM` (Padded Minutes)
		- `5` becomes `05`, `18` remains `18`

	- `PS` (Padded Minutes)
		- `5` becomes `05`, `18` remains `18`

	- `1MS` (1 Place Precision Milliseconds)
		- `.466` becomes `.5`, `.421` becomes `.4`

	- `2MS` (2 Place Precision Milliseconds)
		- `.466` becomes `.47`, `.4` becomes `.40`

	- `3MS` (3 Place Precision Milliseconds)
		- `.4` becomes `.400`

	- `TS` (Total Seconds)

	- `ST` (Start Time)
		- Represented in seconds

	- `ET` (End Time)
		- Represented in seconds

	- `TT` (Total Time)
		- In the format `H:MM:SS.xxx`
		- If the run is less than an hour then hours are not shown
		- Milliseconds use 3 place precision
		- If the run is less than a minute, `0` is shown for the minutes

	- `SF` (Start Frame)

	- `EF` (End Frame)

	- `TF` (Total Frames)

## Example Usage

Custom mod message:

```
Mod Note: Retimed to ${H}h ${M}m ${S}s ${3MS}ms
```

Output:

```
Mod Note: Retimed to 0h 6m 18s 000ms
```

Custom mod message:

```
Retimed! ${M}'${PS}"${3MS}
```

Output:

```
Retimed! 5'09"167
```

## BUGS

	- Multiline mod notes currently are not supported.
