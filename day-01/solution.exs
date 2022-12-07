sum = fn x ->
  String.splitter(x, "\n", trim: true)
  |> Stream.map(&String.to_integer/1)
  |> Enum.sum()
end

calories = File.read!("./input.txt")
  |> String.splitter("\n\n", trim: true)
  |> Stream.map(&sum.(&1))
  |> Enum.sort()
  |> Enum.reverse()

IO.puts(hd(calories))

calories
  |> Enum.slice(0..2)
  |> Enum.sum()
  |> IO.puts()
