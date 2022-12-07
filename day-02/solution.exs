games = File.read!("./input.txt")
  |> String.splitter("\n", trim: true)

defmodule Day02 do

  @game_map %{"X" => "A", "Y" => "B", "Z" => "C"}

  def getValue(x) do
    case x do
      "A" -> 1
      "B" -> 2
      _ -> 3
    end
  end

  def games(x) do
    Stream.map(x, &String.split(&1, " "))
    |> Enum.map(fn [o, u] -> [o, @game_map[u]] end)
    |> Enum.map(&scorer/1)
  end

  def scorer([o, u]) do
    val = getValue(u)
    cond do
      u == o -> 3 + val
      (o == "A" && u == "B") ||(o == "B" && u == "C") ||(o == "C" && u == "A") -> 6 + val
      true -> val
    end
  end

  def getWinner(x) do
    (
      case x do
        "A" -> "B"
        "B" -> "C"
        _ -> "A"
      end
    )
    |> getValue
  end

  def getLoser(x) do
    (
      case x do
        "C" -> "B"
        "A" -> "C"
        _ -> "A"
      end
    )
    |> getValue
  end

  def scorer2(x) do
    [o, result] = String.split(x, " ")
    case result do
      "Y" -> 3 + getValue(o)
      "Z" -> 6 + getWinner(o)
      _ -> getLoser(o)
    end
  end
end


part01 = games
  |> Day02.games()
  |> Enum.sum()

IO.puts(part01)

part02 = games
  |> Enum.map(&Day02.scorer2/1)
  |> Enum.sum()

IO.puts(part02)
